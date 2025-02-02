export interface PlayerConfig {
    sensitivity: string;
    cl_crosshaircolor: string;
    viewmodel_fov: string;
    volume: string;
    net_graph: string;
    [key: string]: string;
}

export interface ServerConfig {
    sv_cheats: string;
    mp_autoteambalance: string;
    mp_limitteams: string;
    sv_maxrate: string;
    sv_minrate: string;
    [key: string]: string;
}

export interface ConfigState {
    player: PlayerConfig;
    server: ServerConfig;
}

export type ConfigType = 'player' | 'server';