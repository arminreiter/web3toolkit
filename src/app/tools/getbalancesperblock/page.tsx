'use client';

import { useState, useRef } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { useAppStore } from '@/lib/store';
import { ToolCard, FormField, OutputDisplay, LoadingButton } from '@/components/tools';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type Mode = 'block' | 'datetime';
type IntervalUnit = 'seconds' | 'minutes' | 'hours' | 'days';
type Timezone = 'utc' | 'local';

interface DatetimeParts {
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
  second: string;
}

const EMPTY_DT: DatetimeParts = { day: '', month: '', year: '', hour: '', minute: '', second: '' };

const UNIT_SECONDS: Record<IntervalUnit, number> = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
};

function isDatetimeFilled(dt: DatetimeParts): boolean {
  return dt.day !== '' && dt.month !== '' && dt.year !== '' && dt.hour !== '' && dt.minute !== '';
}

function datetimeToTimestamp(dt: DatetimeParts, tz: Timezone): number {
  const y = Number(dt.year);
  const m = Number(dt.month) - 1;
  const d = Number(dt.day);
  const h = Number(dt.hour);
  const min = Number(dt.minute);
  const sec = dt.second !== '' ? Number(dt.second) : 0;
  if (tz === 'utc') {
    return Math.floor(Date.UTC(y, m, d, h, min, sec) / 1000);
  }
  return Math.floor(new Date(y, m, d, h, min, sec).getTime() / 1000);
}

function DatetimeInput({ value, onChange, label }: {
  value: DatetimeParts;
  onChange: (v: DatetimeParts) => void;
  label: string;
}) {
  const refs = {
    day: useRef<HTMLInputElement>(null),
    month: useRef<HTMLInputElement>(null),
    year: useRef<HTMLInputElement>(null),
    hour: useRef<HTMLInputElement>(null),
    minute: useRef<HTMLInputElement>(null),
    second: useRef<HTMLInputElement>(null),
  };

  const update = (field: keyof DatetimeParts, raw: string) => {
    const digits = raw.replace(/\D/g, '');
    const limits: Record<keyof DatetimeParts, { max: number; len: number; next?: keyof DatetimeParts }> = {
      day:    { max: 31, len: 2, next: 'month' },
      month:  { max: 12, len: 2, next: 'year' },
      year:   { max: 9999, len: 4, next: 'hour' },
      hour:   { max: 23, len: 2, next: 'minute' },
      minute: { max: 59, len: 2, next: 'second' },
      second: { max: 59, len: 2 },
    };
    const { max, len, next } = limits[field];
    const clamped = digits.slice(0, len);
    if (clamped !== '' && Number(clamped) > max) return;
    onChange({ ...value, [field]: clamped });
    if (clamped.length === len && next) {
      refs[next].current?.focus();
      refs[next].current?.select();
    }
  };

  const seg = (field: keyof DatetimeParts, placeholder: string, width: string) => (
    <input
      ref={refs[field]}
      type="text"
      inputMode="numeric"
      value={value[field]}
      onChange={(e) => update(field, e.target.value)}
      onFocus={(e) => e.target.select()}
      placeholder={placeholder}
      className={`${width} bg-transparent text-center text-base text-foreground outline-none placeholder:text-muted-foreground`}
    />
  );

  const sep = (char: string) => (
    <span className="text-muted-foreground text-base select-none">{char}</span>
  );

  return (
    <div className="space-y-2.5">
      <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
      <div className="flex items-center h-11 w-full rounded-md border border-input dark:bg-input/30 bg-transparent px-3.5 py-2 shadow-xs transition-[color,box-shadow]
                      focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]">
        {seg('day', 'dd', 'w-7')}
        {sep('/')}
        {seg('month', 'MM', 'w-8')}
        {sep('/')}
        {seg('year', 'yyyy', 'w-11')}
        <span className="w-4" />
        {seg('hour', 'HH', 'w-7')}
        {sep(':')}
        {seg('minute', 'mm', 'w-7')}
        {sep(':')}
        {seg('second', 'ss', 'w-7')}
      </div>
    </div>
  );
}

export default function GetBalancesPerBlockPage() {
  const network = useAppStore((s) => s.network);
  const [address, setAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [delimiter, setDelimiter] = useState(', ');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState<Mode>('block');

  // Block mode
  const [startBlock, setStartBlock] = useState(0);
  const [endBlock, setEndBlock] = useState(0);
  const [iteration, setIteration] = useState(17280);

  // Datetime mode
  const [startDt, setStartDt] = useState<DatetimeParts>(EMPTY_DT);
  const [endDt, setEndDt] = useState<DatetimeParts>(EMPTY_DT);
  const [intervalValue, setIntervalValue] = useState(1);
  const [intervalUnit, setIntervalUnit] = useState<IntervalUnit>('days');
  const [timezone, setTimezone] = useState<Timezone>('utc');

  const getBalances = async () => {
    setLoading(true);
    setOutput('');
    let result = '';

    try {
      if (mode === 'block') {
        let actualEndBlock = BigInt(endBlock);
        if (actualEndBlock === BigInt(0)) {
          actualEndBlock = await Web3Service.getLastBlockNumber(network);
          setEndBlock(Number(actualEndBlock));
        }

        for await (const balance of Web3Service.getBalancesPerBlockAsync(
          address,
          network.rpcUrl,
          delimiter,
          BigInt(startBlock),
          actualEndBlock,
          iteration,
          tokenAddress || undefined
        )) {
          result += balance;
          setOutput(result);
        }
      } else {
        if (!isDatetimeFilled(startDt)) {
          setOutput('Please fill in the start datetime.');
          return;
        }
        const startTs = datetimeToTimestamp(startDt, timezone);
        let endTs: number;
        if (isDatetimeFilled(endDt)) {
          endTs = datetimeToTimestamp(endDt, timezone);
        } else {
          endTs = Math.floor(Date.now() / 1000);
        }
        const intervalSecs = intervalValue * UNIT_SECONDS[intervalUnit];

        for await (const balance of Web3Service.getBalancesPerDatetimeAsync(
          address,
          network.rpcUrl,
          delimiter,
          startTs,
          endTs,
          intervalSecs,
          tokenAddress || undefined,
          timezone === 'utc'
        )) {
          result += balance;
          setOutput(result);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleClass = (active: boolean) =>
    `px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
      active
        ? 'bg-primary text-primary-foreground shadow-sm'
        : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <ToolCard title="Balances Per Block" description="Query balance history for a single address across block ranges or time ranges.">
      <FormField label="Address" value={address} onChange={setAddress} placeholder="Address to check" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Token Contract Address (optional)" value={tokenAddress} onChange={setTokenAddress} placeholder="Leave empty for native currency" />
        <FormField label="Delimiter" value={delimiter} onChange={setDelimiter} />
      </div>

      {/* Mode toggle */}
      <div className="space-y-2.5">
        <Label className="text-sm font-medium text-muted-foreground">Range Mode</Label>
        <div className="flex gap-1 p-1 rounded-lg bg-secondary w-fit">
          <button onClick={() => setMode('block')} className={toggleClass(mode === 'block')}>
            Block Number
          </button>
          <button onClick={() => setMode('datetime')} className={toggleClass(mode === 'datetime')}>
            Datetime
          </button>
        </div>
      </div>

      {mode === 'block' ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField label="Start Block" type="number" value={startBlock} onChange={(v) => setStartBlock(Number(v))} min={1} />
          <FormField label="End Block" type="number" value={endBlock} onChange={(v) => setEndBlock(Number(v))} min={1} />
          <FormField label="Iteration" type="number" value={iteration} onChange={(v) => setIteration(Number(v))} min={1} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DatetimeInput label="Start Datetime" value={startDt} onChange={setStartDt} />
            <DatetimeInput label="End Datetime (empty = now)" value={endDt} onChange={setEndDt} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2.5">
              <Label className="text-sm font-medium text-muted-foreground">Interval</Label>
              <div className="flex gap-3 items-center">
                <Input
                  type="number"
                  value={intervalValue}
                  onChange={(e) => setIntervalValue(Number(e.target.value))}
                  min={1}
                  className="w-28"
                />
                <select
                  value={intervalUnit}
                  onChange={(e) => setIntervalUnit(e.target.value as IntervalUnit)}
                  className="h-11 rounded-md border border-input dark:bg-input/30 bg-transparent px-3 text-base text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                >
                  <option value="seconds">Seconds</option>
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>
            <div className="space-y-2.5">
              <Label className="text-sm font-medium text-muted-foreground">Timezone</Label>
              <div className="flex gap-1 p-1 rounded-lg bg-secondary w-fit h-11 items-center">
                <button onClick={() => setTimezone('utc')} className={toggleClass(timezone === 'utc')}>
                  UTC
                </button>
                <button onClick={() => setTimezone('local')} className={toggleClass(timezone === 'local')}>
                  Local
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <LoadingButton loading={loading} loadingText="Fetching..." onClick={getBalances}>Get Balances</LoadingButton>
      <OutputDisplay value={output} rows={12} placeholder="Balance history will appear here..." />
    </ToolCard>
  );
}
