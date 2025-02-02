import React, { ChangeEvent } from 'react';
import { ConfigInput } from '@/components/ConfigInput/ConfigInput';
import { ConfigFileUpload } from '@/components/ConfigFileUpload/ConfigFileUpload';
import { Button } from '@/components/ui/button';
import { generateConfigContent } from '@/utils/configUtils';
import { ServerConfig } from '@/types/config';

interface ServerConfigGeneratorProps {
    config: ServerConfig;
    onConfigChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ServerConfigGenerator: React.FC<ServerConfigGeneratorProps> = ({
    config,
    onConfigChange,
}) => {
    const downloadConfig = () => {
        const content = generateConfigContent(config, 'server');
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'server_config.cfg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <ConfigFileUpload onFileUpload={(parsedConfig) => {
                // Handle file upload with type checking
                const serverConfig = parsedConfig as ServerConfig;
                Object.entries(serverConfig).forEach(([key, value]) => {
                    const event = {
                        target: { name: key, value, type: 'text' }
                    } as ChangeEvent<HTMLInputElement>;
                    onConfigChange(event);
                });
            }} />

            <form className="space-y-4">
                <ConfigInput
                    label="Server Cheats"
                    name="sv_cheats"
                    value={config.sv_cheats}
                    onChange={onConfigChange}
                    type="number"
                    min="0"
                    max="1"
                />
                <ConfigInput
                    label="Auto Team Balance"
                    name="mp_autoteambalance"
                    value={config.mp_autoteambalance}
                    onChange={onConfigChange}
                    type="number"
                    min="0"
                    max="1"
                />
                {/* Add other server-specific inputs */}
            </form>

            <div className="mt-6 p-4 bg-gray-100 rounded">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                    {generateConfigContent(config, 'server')}
                </pre>
            </div>

            <div className="mt-4">
                <Button onClick={downloadConfig} className="w-full">
                    Download Server Config
                </Button>
            </div>
        </div>
    );
};