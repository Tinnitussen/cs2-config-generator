import React, { ChangeEvent } from 'react';
import { ConfigInput } from '@/components/ConfigInput/ConfigInput';
import { ConfigFileUpload } from '@/components/ConfigFileUpload/ConfigFileUpload';
import { Button } from '@/components/ui/button';
import { generateConfigContent } from '@/utils/configUtils';
import { PlayerConfig } from '@/types/config';

interface PlayerConfigGeneratorProps {
    config: PlayerConfig;
    onConfigChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PlayerConfigGenerator: React.FC<PlayerConfigGeneratorProps> = ({
    config,
    onConfigChange,
}) => {
    const downloadConfig = () => {
        const content = generateConfigContent(config, 'player');
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'player_config.cfg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <ConfigFileUpload onFileUpload={(parsedConfig) => {
                // Handle file upload with type checking
                const playerConfig = parsedConfig as PlayerConfig;
                Object.entries(playerConfig).forEach(([key, value]) => {
                    const event = {
                        target: { name: key, value, type: 'text' }
                    } as ChangeEvent<HTMLInputElement>;
                    onConfigChange(event);
                });
            }} />

            <form className="space-y-4">
                <ConfigInput
                    label="Mouse Sensitivity"
                    name="sensitivity"
                    value={config.sensitivity}
                    onChange={onConfigChange}
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="10"
                />
                <ConfigInput
                    label="Crosshair Color"
                    name="cl_crosshaircolor"
                    value={config.cl_crosshaircolor}
                    onChange={onConfigChange}
                    type="color"
                />
                {/* Add other player-specific inputs */}
            </form>

            <div className="mt-6 p-4 bg-gray-700 rounded">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                    {generateConfigContent(config, 'player')}
                </pre>
            </div>

            <div className="mt-4">
                <Button onClick={downloadConfig} className="w-full">
                    Download Player Config
                </Button>
            </div>
        </div>
    );
};