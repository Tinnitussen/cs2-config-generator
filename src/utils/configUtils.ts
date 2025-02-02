import { ConfigType, PlayerConfig, ServerConfig } from "@/types/config";

export function parseConfigFile(content: string): PlayerConfig | ServerConfig {

    const lines = content.split('\n');

    const config: any = {};

    lines.forEach(line => {

        const [key, value] = line.split('=');

        if (key && value) {

            config[key.trim()] = value.trim();

        }

    });

    return config as PlayerConfig | ServerConfig;

}

export const generateConfigContent = (config: Record<string, string>, type: ConfigType): string => {
    const timestamp = new Date().toLocaleDateString();
    let content = `// CS2 ${type} Configuration generated on ${timestamp}\n`;
    content += `// Generated via https://tinnitussen.github.io/cs2-config-generator/\n\n`;

    Object.entries(config).forEach(([command, value]) => {
        content += `"${command}" "${value}"\n`;
    });

    return content;
};