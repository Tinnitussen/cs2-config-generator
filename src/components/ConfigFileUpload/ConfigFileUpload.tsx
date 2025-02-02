import { PlayerConfig, ServerConfig } from "@/types/config";
import { parseConfigFile } from "@/utils/configUtils";
import { Upload } from "lucide-react";

interface ConfigFileUploadProps {
    onFileUpload: (config: PlayerConfig | ServerConfig) => void;
}

export const ConfigFileUpload: React.FC<ConfigFileUploadProps> = ({ onFileUpload }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;


        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            const parsedConfig = parseConfigFile(content);
            onFileUpload(parsedConfig);
        };
        reader.readAsText(file);
    };

    return (
        <div className="mb-6">
            <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue-50">
                <Upload className="w-8 h-8 text-blue-500" />
                <span className="mt-2 text-base">Upload Config File</span>
                <input
                    type="file"
                    className="hidden"
                    accept=".cfg"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
};