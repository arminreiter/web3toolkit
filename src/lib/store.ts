import { create } from 'zustand';
import { Action } from './actions/action';
import { ActionInput } from './models/actioninput';
import { Network } from './models/network';

export const SELECTED_NETWORK_KEY = 'selectedNetwork';
const DEFAULT_NETWORK = 'avax-main';

function getDefaultNetwork(): Network {
    return Network.getNetwork(DEFAULT_NETWORK) ?? Network.getNetworks()[0];
}

export class ActionResult {
    constructor(public actionName: string, public result: string) {}
}

interface AppState {
    input: string;
    lastResult: string;
    results: ActionResult[];
    network: Network;
    actions: Action[];

    setInput: (input: string) => void;
    addResult: (actionName: string, value: string) => void;
    addAction: (action: Action) => void;
    removeAction: (id: number) => void;
    getInput: () => ActionInput;
    clear: () => void;
    setNetwork: (network: Network) => void;
    trySetNetwork: (net: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
    input: '',
    lastResult: '',
    results: [],
    network: getDefaultNetwork(),
    actions: [],

    setInput: (input: string) => set({ input }),

    addResult: (actionName: string, value: string) => set((state) => ({
        lastResult: value,
        results: [...state.results, new ActionResult(actionName, value)],
    })),

    addAction: (action: Action) => set((state) => ({
        actions: [...state.actions, action],
    })),

    removeAction: (id: number) => set((state) => ({
        actions: state.actions.filter((a) => a.id !== id),
    })),

    getInput: () => {
        const state = get();
        return new ActionInput(
            state.lastResult ? state.lastResult.trim() : state.input.trim(),
            state.network
        );
    },

    clear: () => set({ lastResult: '', results: [] }),

    setNetwork: (network: Network) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(SELECTED_NETWORK_KEY, network.shortName);
        }
        set({ network });
    },

    trySetNetwork: (net: string) => {
        const network = Network.getNetwork(net);
        if (network) {
            if (typeof window !== 'undefined') {
                localStorage.setItem(SELECTED_NETWORK_KEY, network.shortName);
            }
            set({ network });
        }
    },
}));
