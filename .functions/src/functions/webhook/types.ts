export type TransferDataType = {
    amount: number;
    currency: "NGN" | "USD";
    domain: "test" | "live";
    failures: null;
    id: number;
    integration: {
        id: number;
        is_live: boolean;
        business_name: string;
    };
    reason: string;
    reference: string;
    source: "balance";
    source_details: null;
    status: "success" | "failed" | "reversed";
    titan_code: null;
    transfer_code: string;
    transferred_at: null | string;
    recipient: {
        active: boolean;
        currency: string;
        description: null;
        domain: "test" | "live";
        email: string;
        id: number;
        integration: number;
        metadata: null | any;
        name: string;
        recipient_code: string;
        type: string;
        is_deleted: boolean;
        details: {
            authorization_code: null;
            account_number: string;
            account_name: string;
            bank_code: string;
            bank_name: string;
        };
        created_at: string;
        updated_at: string;
    };
    session: { provider: null | string; id: null | string };
    created_at: string;
    updated_at: string;
};
