import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore, ActionResult } from './store';
import { SimpleAction } from './actions/action';
import { Module } from './models/module';
import { Network } from './models/network';

describe('useAppStore', () => {
  beforeEach(() => {
    // Reset store between tests
    useAppStore.setState({
      input: '',
      lastResult: '',
      results: [],
      network: Network.getNetworks()[0],
      actions: [],
    });
  });

  it('should set input', () => {
    useAppStore.getState().setInput('test input');
    expect(useAppStore.getState().input).toBe('test input');
  });

  it('should add result', () => {
    useAppStore.getState().addResult('Test Action', 'test result');
    const state = useAppStore.getState();
    expect(state.results.length).toBe(1);
    expect(state.results[0].actionName).toBe('Test Action');
    expect(state.results[0].result).toBe('test result');
    expect(state.lastResult).toBe('test result');
  });

  it('should add action', () => {
    const action = new SimpleAction('Test', Module.Utils, 'desc', async () => 'result');
    useAppStore.getState().addAction(action);
    expect(useAppStore.getState().actions.length).toBe(1);
    expect(useAppStore.getState().actions[0].title).toBe('Test');
  });

  it('should remove action', () => {
    const action = new SimpleAction('Test', Module.Utils, 'desc', async () => 'result');
    useAppStore.getState().addAction(action);
    const actionId = useAppStore.getState().actions[0].id;
    useAppStore.getState().removeAction(actionId);
    expect(useAppStore.getState().actions.length).toBe(0);
  });

  it('should clear results', () => {
    useAppStore.getState().addResult('Test', 'result');
    useAppStore.getState().clear();
    expect(useAppStore.getState().results.length).toBe(0);
    expect(useAppStore.getState().lastResult).toBe('');
  });

  it('should get input from lastResult when available', () => {
    useAppStore.getState().setInput('original input');
    useAppStore.getState().addResult('Test', 'last result');
    const input = useAppStore.getState().getInput();
    expect(input.input).toBe('last result');
  });

  it('should get input from input when no lastResult', () => {
    useAppStore.getState().setInput('original input');
    const input = useAppStore.getState().getInput();
    expect(input.input).toBe('original input');
  });

  it('should set network', () => {
    const networks = Network.getNetworks();
    const newNetwork = networks[1];
    useAppStore.getState().setNetwork(newNetwork);
    expect(useAppStore.getState().network.name).toBe(newNetwork.name);
  });

  it('should try set network by name', () => {
    useAppStore.getState().trySetNetwork('eth-main');
    expect(useAppStore.getState().network.name).toBe('Ethereum');
  });

  it('should not change network for invalid name', () => {
    const originalNetwork = useAppStore.getState().network;
    useAppStore.getState().trySetNetwork('nonexistent');
    expect(useAppStore.getState().network.name).toBe(originalNetwork.name);
  });
});
