import { useState } from 'react';

const CS2ConfigGenerator = () => {
    const [config, setConfig] = useState({
        sensitivity: 1.0,
        crosshairColor: '#00FF00',
        viewmodelFOV: 68,
        volumeLevel: 1.0,
        netGraph: false,
        customBinds: {},
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const generateConfig = () => {
        let configText = `// CS2 Configuration generated on ${new Date().toLocaleDateString()}\n\n`;

        configText += `sensitivity "${config.sensitivity}"\n`;
        configText += `cl_crosshaircolor "${config.crosshairColor}"\n`;
        configText += `viewmodel_fov "${config.viewmodelFOV}"\n`;
        configText += `volume "${config.volumeLevel}"\n`;
        configText += `net_graph "${config.netGraph ? 1 : 0}"\n`;

        return configText;
    };

    const downloadConfig = () => {
        const configContent = generateConfig();
        const blob = new Blob([configContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'autoexec.cfg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <form className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Mouse Sensitivity
                        <input
                            type="number"
                            name="sensitivity"
                            value={config.sensitivity}
                            onChange={handleChange}
                            step="0.1"
                            min="0.1"
                            max="10"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                        />
                    </label>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Crosshair Color
                        <input
                            type="color"
                            name="crosshairColor"
                            value={config.crosshairColor}
                            onChange={handleChange}
                            className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm"
                        />
                    </label>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Viewmodel FOV
                        <input
                            type="number"
                            name="viewmodelFOV"
                            value={config.viewmodelFOV}
                            onChange={handleChange}
                            min="54"
                            max="88"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                        />
                    </label>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Volume Level
                        <input
                            type="range"
                            name="volumeLevel"
                            value={config.volumeLevel}
                            onChange={handleChange}
                            min="0"
                            max="1"
                            step="0.1"
                            className="mt-1 block w-full"
                        />
                    </label>
                </div>

                <div>
                    <label className="flex items-center text-gray-700 text-sm font-bold">
                        <input
                            type="checkbox"
                            name="netGraph"
                            checked={config.netGraph}
                            onChange={handleChange}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2">Show Net Graph</span>
                    </label>
                </div>

                <div className="pt-4">
                    <button
                        type="button"
                        onClick={downloadConfig}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Generate & Download Config
                    </button>
                </div>
            </form>

            <div className="mt-6 p-4 bg-gray-100 rounded">
                <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                <pre className="whitespace-pre-wrap font-mono text-sm">
                    {generateConfig()}
                </pre>
            </div>
        </div>
    );
};

export default CS2ConfigGenerator;