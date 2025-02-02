import React, { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { ConfigInput } from '@/components/ConfigInput/ConfigInput';
import { ConfigTypeSelector } from '@/components/ConfigTypeSelector/ConfigTypeSelector';
import { ConfigFileUpload } from '@/components/ConfigFileUpload/ConfigFileUpload';
import { generateConfigContent } from '@/utils/configUtils';
import {
    ConfigType,
    ConfigState,
    PlayerConfig,
    ServerConfig,
} from '@/types/config';

const initialConfig: ConfigState = {
    player: {
        sensitivity: "1.0",
        cl_crosshaircolor: "#00FF00",
        viewmodel_fov: "68",
        volume: "1.0",
        net_graph: "0",
    },
    server: {
        sv_cheats: "0",
        mp_autoteambalance: "1",
        mp_limitteams: "2",
        sv_maxrate: "128000",
        sv_minrate: "128000",
    }
};

const CS2ConfigGenerator: React.FC = () => {
    const [configType, setConfigType] = useState<ConfigType>('player');
    const [config, setConfig] = useState<ConfigState>(initialConfig);

    const handleConfigChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setConfig(prev => ({
            ...prev,
            [configType]: {
                ...prev[configType],
                [name]: type === 'checkbox' ? (checked ? "1" : "0") : value
            }
        }));
    };

    const handleFileUpload = (parsedConfig: PlayerConfig | ServerConfig) => {
        setConfig(prev => ({
            ...prev,
            [configType]: {
                ...prev[configType],
                ...parsedConfig
            }
        }));
    };

    const downloadConfig = () => {
        const content = generateConfigContent(config[configType], configType);
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${configType}_config.cfg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <ConfigTypeSelector
                currentType={configType}
                onTypeChange={setConfigType}
            />

            <ConfigFileUpload onFileUpload={handleFileUpload} />

            <form className="space-y-4">
                {configType === 'player' && (
                    <>
                        <ConfigInput
                            label="Mouse Sensitivity"
                            name="sensitivity"
                            value={config.player.sensitivity}
                            onChange={handleConfigChange}
                            type="number"
                            step="0.1"
                            min="0.1"
                            max="10"
                        />
                        <ConfigInput
                            label="Crosshair Color"
                            name="cl_crosshaircolor"
                            value={config.player.cl_crosshaircolor}
                            onChange={handleConfigChange}
                            type="color"
                        />
                    </>
                )}

                {configType === 'server' && (
                    <>
                        <ConfigInput
                            label="Server Cheats"
                            name="sv_cheats"
                            value={config.server.sv_cheats}
                            onChange={handleConfigChange}
                            type="number"
                            min="0"
                            max="1"
                        />
                        <ConfigInput
                            label="Auto Team Balance"
                            name="mp_autoteambalance"
                            value={config.server.mp_autoteambalance}
                            onChange={handleConfigChange}
                            type="number"
                            min="0"
                            max="1"
                        />
                    </>
                )}
            </form>

            <div className="mt-6 p-4 bg-gray-100 rounded">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                    {generateConfigContent(config[configType], configType)}
                </pre>
            </div>

            <div className="mt-4">
                <Button
                    onClick={downloadConfig}
                    className="w-full"
                >
                    Download Config
                </Button>
            </div>
        </div>
    );
};

export default CS2ConfigGenerator;