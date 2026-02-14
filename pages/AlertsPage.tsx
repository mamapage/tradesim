
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Alert } from '../types';
import { INITIAL_ALERTS_DATA } from '../constants';
import { PlusCircle, Bell, BellOff } from 'lucide-react';

const AlertsPage: React.FC = () => {
    const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS_DATA);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Create New Alert</CardTitle>
            <CardDescription>Get notified when market conditions are met.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Input label="Symbol" placeholder="e.g., NIFTY, RELIANCE" />
            <Select label="Metric">
                <option>Spot Price</option>
                <option>Near-Month Future</option>
                <option>Future Price Difference</option>
            </Select>
            <Select label="Condition">
                <option>Crosses</option>
                <option>Greater than</option>
                <option>Less than</option>
                <option>Turns negative</option>
                <option>Turns positive</option>
            </Select>
            <Input label="Value" type="number" placeholder="e.g., 22000" />
             <div className="pt-2">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Notify via:</h4>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center gap-2 text-gray-200">
                        <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-green-600 focus:ring-green-500" defaultChecked/>
                        Telegram
                    </label>
                    <label className="flex items-center gap-2 text-gray-200">
                        <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-green-600 focus:ring-green-500"/>
                        WhatsApp
                    </label>
                     <label className="flex items-center gap-2 text-gray-200">
                        <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-green-600 focus:ring-green-500"/>
                        SMS
                    </label>
                </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => alert('New alert created!')}>
                <PlusCircle size={18} />
                Create Alert
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="lg:col-span-2">
         <Card>
            <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
                <CardDescription>Your currently configured market alerts.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                <ul className="space-y-3">
                    {alerts.map(alert => (
                        <li key={alert.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                           <div className="flex items-center gap-3">
                            {alert.active ? <Bell size={20} className="text-green-400"/> : <BellOff size={20} className="text-gray-500" />}
                             <div>
                                <p className="font-semibold text-white">
                                    {alert.symbol} {alert.metric} {alert.condition} {alert.value > 0 ? alert.value : ''}
                                </p>
                                <p className={`text-xs ${alert.active ? 'text-green-400' : 'text-gray-500'}`}>
                                    {alert.active ? 'Active' : 'Inactive'}
                                </p>
                             </div>
                           </div>
                           <Button variant="secondary" size="sm" className="px-2 py-1 text-xs">
                                Edit
                            </Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
         </Card>
      </div>
    </div>
  );
};

export default AlertsPage;