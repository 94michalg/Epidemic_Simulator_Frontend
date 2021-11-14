import { Dailystats } from "./dailystats.model";

export interface SimulationWithStats {
    id: any;
    name: string;
    population: number;
    infected: number;
    rvalue: number;
    mortality: number;
    infectedTime: number;
    mortalityTime: number;
    simulationTime: number;
    dailyStatsList: Dailystats[];
}