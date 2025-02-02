import React, { useState, ChangeEvent } from 'react';
import { ConfigTypeSelector } from '@/components/ConfigTypeSelector/ConfigTypeSelector';
import { PlayerConfigGenerator } from '@/components/ConfigGenerators/PlayerConfigGenerator';
import { ServerConfigGenerator } from '@/components/ConfigGenerators/ServerConfigGenerator';
import { ConfigType, ConfigState } from '@/types/config';
import { loadPreset } from '@/utils/presetUtils';

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

    const handlePresetSelect = async (presetName: string) => {
        if (presetName === 'default') {
            setConfig(prev => ({ ...prev, player: initialConfig.player }));
            return;
        }

        const presetConfig = await loadPreset(presetName);
        setConfig(prev => ({ ...prev, player: presetConfig }));
    };

    const handleTypeChange = (type: string) => {
        setConfigType(type as ConfigType);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg">
            <ConfigTypeSelector
                currentType={configType}
                onTypeChange={handleTypeChange}
                onPresetSelect={handlePresetSelect}
                preset='default'
            />

            {configType === 'player' ? (
                <PlayerConfigGenerator
                    config={config.player}
                    onConfigChange={handleConfigChange}
                />
            ) : (
                <ServerConfigGenerator
                    config={config.server}
                    onConfigChange={handleConfigChange}
                />
            )}
        </div>
    );
};

export default CS2ConfigGenerator;