// 1. Import the JSON mock
import sampleJson from './sample-response.json';

// 2. Define types for imported JSON structure
type SampleEndpoint = {
  name: string;
  method: string;
  url: string;
  response: any;
};

type SampleDataType = {
  endpoints: SampleEndpoint[];
};

const sampleData = sampleJson as SampleDataType;

// 3. Define actual data models used in your app

export type Borrower = {
  id: string;
  name: string;
  loan_type: string;
  amount: number;
  status: string;
};

export type BorrowerDetail = {
  id: string;
  name: string;
  email: string;
  phone: string;
  loan_amount: number;
  status: string;
  employment: string;
  income: number;
  existing_loan: number;
  credit_score: number;
  source_of_funds: string;
  risk_signal: string;
  ai_flags: string[];
};

export type BrokerInfo = {
  name: string;
  deals: number;
  approval_rate: string;
  pending: number;
};

export type OnboardingWorkflow = {
  steps: string[];
};

// 4. Mock API functions

export async function fetchBorrowerPipeline(): Promise<{
  new: Borrower[];
  in_review: Borrower[];
  approved: Borrower[];
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleData.endpoints[0].response);
    }, 300);
  });
}

export async function fetchBorrowerDetail(id: string): Promise<BorrowerDetail> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (id === '1') {
        resolve(sampleData.endpoints[1].response);
      } else {
        resolve(null as any); // or throw error/log
      }
    }, 300);
  });
}

export async function fetchBrokerInfo(id: string): Promise<BrokerInfo> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleData.endpoints[6].response);
    }, 300);
  });
}

export async function fetchOnboardingWorkflow(): Promise<OnboardingWorkflow> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleData.endpoints[7].response);
    }, 300);
  });
}

// You can add mock POST actions similarly
