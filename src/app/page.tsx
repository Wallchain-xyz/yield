'use client';

import { Button, Card, CardContent, CardHeader, Container, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { ProfitsResponse } from '@/app/api/profits/route';
import { checkProfits } from '@/lib/checkProfits';
import { isAddress } from '@/lib/utils/isAddress';

function SuccessResponse({ response }: { response: ProfitsResponse }) {
  const { data } = response;

  return (
    <Card elevation={2} sx={{ maxWidth: 480, width: '100%' }}>
      <CardHeader title="Results" />
      <CardContent sx={{ p: 2 }}>
        <Stack spacing={0.5} pb={2}>
          {data.records.map(record => (
            <Typography key={record.tokenName} variant="body1">
              ${record.profit.toFixed(2)} in {record.tokenName}
            </Typography>
          ))}
        </Stack>
        <Typography variant="body1">
          It&apos;s not a financial advice but check{' '}
          <a href="https://wallchain.xyz" target="_blank" rel="noreferrer">
            wallchain.xyz
          </a>{' '}
          for more info.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  const [address, setAddress] = useState('');
  const [response, setResponse] = useState<null | ProfitsResponse>(null);
  const [isAddressInvalid, setIsAddressInvalid] = useState(false);

  const fetchData = async () => {
    if (isAddress(address)) {
      checkProfits(address).then(setResponse);
      setIsAddressInvalid(false);
    } else {
      setIsAddressInvalid(true);
    }
  };

  return (
    <Container sx={{ height: '100vh' }}>
      <Stack sx={{ pt: '30vh' }} height="100%" alignItems="center" spacing={4}>
        <Card elevation={2} sx={{ maxWidth: 480, width: '100%' }}>
          <CardHeader title="Yield Master" />
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Typography variant="body1">
                Tool that allows you to estimate your potential yield from DeFi investments.
              </Typography>
              <TextField
                label="Address"
                variant="outlined"
                size="small"
                fullWidth
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              <Button variant="contained" fullWidth onClick={fetchData}>
                Search
              </Button>
            </Stack>
          </CardContent>
        </Card>
        {response && response.found && <SuccessResponse response={response} />}
        {response && !response.found && (
          <Typography variant="h5" color="error">
            No info for this account
          </Typography>
        )}
        {isAddressInvalid && (
          <Typography variant="h5" color="error">
            Invalid address
          </Typography>
        )}
      </Stack>
    </Container>
  );
}
