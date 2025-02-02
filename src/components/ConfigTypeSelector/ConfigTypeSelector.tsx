import React from 'react';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ConfigType } from '@/types/config';


export interface ConfigTypeSelectorProps {

    currentType: ConfigType;

    onTypeChange: (type: string) => void;

    onPresetSelect: (presetName: string) => Promise<void>;

    preset: string;

}


const ConfigTypeSelector: React.FC<ConfigTypeSelectorProps> = ({
    currentType,
    onTypeChange,
    preset,
    onPresetSelect: handlePresetChange,

}) => {
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
                <Button
                    onClick={() => onTypeChange('player')}
                    className={`px-4 py-2 ${currentType === 'player' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    Player Config
                </Button>
                <Button
                    onClick={() => onTypeChange('server')}
                    className={`px-4 py-2 ${currentType === 'server' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    Server Config
                </Button>
            </div>

            {currentType === 'player' && (
                <div className="w-full">
                    <Select
                        value={preset}
                        onValueChange={handlePresetChange}
                        className="w-full"
                    >
                        <Select.Trigger className="w-full border border-gray-300 rounded-md shadow-sm">
                            <Select.Value placeholder="Select a preset" />
                        </Select.Trigger>
                        <Select.Content className="bg-white border border-gray-300 rounded-md shadow-lg">
                            <Select.Item value="default" className="px-4 py-2 hover:bg-gray-100 text-gray-800">Default Settings</Select.Item>
                            <Select.Item value="s1mple" className="px-4 py-2 hover:bg-gray-100 text-gray-800">s1mple Config</Select.Item>
                            <Select.Item value="niko" className="px-4 py-2 hover:bg-gray-100 text-gray-800">NiKo Config</Select.Item>
                            <Select.Item value="m0nesy" className="px-4 py-2 hover:bg-gray-100 text-gray-800">m0NESY Config</Select.Item>
                        </Select.Content>
                    </Select>
                </div>
            )}
        </div>
    );
};

export { ConfigTypeSelector };