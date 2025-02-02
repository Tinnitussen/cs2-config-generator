import { PlayerConfig } from "@/types/config";

export const loadPreset = async (presetName: string): Promise<PlayerConfig> => {
    try {
        const url = `cs2-config-generator/src/assets/presets/${presetName}.cfg`;
        console.log(`Fetching preset from URL: ${url}`);
        const response = await fetch(url);
        console.log(`Response status: ${response.status}`);
        if (!response.ok) {
            throw new Error(`Failed to load preset: ${presetName}`);
        }
        const configText = await response.text();
        return parseConfigFile(configText);
    } catch (error) {
        console.error('Error loading preset:', error);
        return getDefaultConfig();
    }
};

const getDefaultConfig = (): PlayerConfig => ({
    sensitivity: "1.0",
    cl_crosshaircolor: "#00FF00",
    viewmodel_fov: "68",
    volume: "1.0",
    net_graph: "0",
});

const parseConfigFile = (content: string): PlayerConfig => {
    const config: Record<string, string> = {};
    const lines = content.split('\n');

    lines.forEach(line => {
        // Remove comments and trim whitespace
        const trimmedLine = line.split('//')[0].trim();
        if (!trimmedLine) return;

        // Match "command" "value" pattern
        const match = trimmedLine.match(/"([^"]+)"\s+"([^"]+)"/);
        if (match) {
            const [, command, value] = match;
            config[command] = value;
        }
    });

    return config as PlayerConfig;
};