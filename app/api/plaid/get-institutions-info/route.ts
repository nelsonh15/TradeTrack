
import { NextRequest, NextResponse } from 'next/server';
import { CountryCode, PlaidApi } from 'plaid';
import { config } from '../../config';

const plaidClient = new PlaidApi(config);

export async function POST(req: NextRequest) {
  try {
    const { institution_id } = await req.json()
    const response = await plaidClient.institutionsGetById({
      institution_id: institution_id,
      country_codes: ['US'] as CountryCode[],
      options: {
        include_optional_metadata: true, // Includes branding details
      },
    });
    return NextResponse.json({ 
      institution: response.data.institution, 
       
    });
  }
  catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Unable to fetch transactions' }, { status: 500 });
  }
}
