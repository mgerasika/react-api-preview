/* eslint-disable @typescript-eslint/no-explicit-any */
declare type cy = typeof Cypress.cy;
import { OldSchedulerData } from 'react-big-scheduler';

declare module 'react-big-scheduler' {
    const Scheduler: any;
    const SchedulerData: OldSchedulerData & {
        events: any;
    };
}

declare module '@types/react-big-scheduler' {
    const Scheduler: any;

    class SchedulerData extends OldSchedulerData {
        events: any;
    }
}

/// <reference types="react" />
/**
 * Callback types provided for descriptive type-hints
 */
declare type ShowModal = () => void;
declare type HideModal = () => void;

type Callback<T> = () => T;
// make required dependency argument
declare module 'react-modal-hook' {
    /**
     * React hook for showing modal windows
     */
    declare const useModal: (component: import('react').FunctionComponent<any>, inputs: any[]) => [ShowModal, HideModal];
}

declare module 'react' {
    // function useCallback<T extends (...args:unknown[]) => unknown, T1>(callback: (arg1: T1) => unknown, deps: readonly unknown[]): T;
    function useCallback<T extends (...args: unknown[]) => any>(callback: T, deps: DependencyList): T;
}
