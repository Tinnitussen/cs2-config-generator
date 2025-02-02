import { ConfigType } from "@/types/config";
import { Button } from "@/components/ui/button";
interface ConfigTypeSelectorProps {
    currentType: ConfigType;
    onTypeChange: (type: ConfigType) => void;
}

export const ConfigTypeSelector: React.FC<ConfigTypeSelectorProps> = ({ currentType, onTypeChange }) => (
    <div className="mb-6">
        <div className="flex gap-4">
            <Button
                variant={currentType === 'player' ? 'primary' : 'secondary'}
                onClick={() => onTypeChange('player')}
                className="flex-1"
            >
                Player Config
            </Button>
            <Button
                variant={currentType === 'server' ? 'primary' : 'secondary'}
                onClick={() => onTypeChange('server')}
                className="flex-1"
            >
                Server Config
            </Button>
        </div>
    </div>
);