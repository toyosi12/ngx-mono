export interface IMonoOptions{
    /**
     * public key. 
     * gotten from the mono dashboard.
     */
    key: string;

    scope?: string;

    data?: {
        type: string;
        amount: number;
        description: string
    };

    reauthToken?: string;

    [key: string]: any

}

export interface IEventOptions{
    event: string,
    data: {
        timestamp: number
    }
}