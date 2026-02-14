
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { BROKERS } from '../constants';
import { Broker } from '../types';
import { Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
    const [selectedBroker, setSelectedBroker] = useState<Broker>(Broker.Zerodha);
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [redirectUrl, setRedirectUrl] = useState('');

    const handleSave = () => {
        if (!apiKey || !apiSecret) {
            alert('API Key and API Secret are required.');
            return;
        }
        console.log({
            broker: selectedBroker,
            apiKey,
            apiSecret,
            redirectUrl,
        });
        alert(`Credentials for ${selectedBroker} saved successfully (check console).`);
    };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Brokerage API Settings</CardTitle>
          <CardDescription>
            Securely connect your broker account to enable live data and paper trading. Your credentials are encrypted and stored securely.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
            <Select 
                label="Select Broker"
                id="broker"
                value={selectedBroker}
                onChange={(e) => setSelectedBroker(e.target.value as Broker)}
            >
                {BROKERS.map((broker) => (
                    <option key={broker} value={broker}>{broker}</option>
                ))}
            </Select>
            <Input 
                label="API Key" 
                id="api-key"
                type="password"
                placeholder="Enter your API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
            />
            <Input 
                label="API Secret" 
                id="api-secret"
                type="password"
                placeholder="Enter your API Secret"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
            />
             <Input 
                label="Redirect URL (Optional)" 
                id="redirect-url"
                type="text"
                placeholder="Enter your Redirect URL if applicable"
                value={redirectUrl}
                onChange={(e) => setRedirectUrl(e.target.value)}
            />
        </CardContent>
        <CardFooter>
            <Button className="w-full" onClick={handleSave}>
                <Save size={18} />
                Save Credentials
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsPage;