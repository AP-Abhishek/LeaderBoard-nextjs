import { toast } from "react-toastify";

type TeamStats = {
    id: number,
    name: string,
    matches: number,
    wins: number,
    loss: number,
    tieBreaker: number,
    points: number
}

let Teams: TeamStats[] = []

export const addTeam = (Team: TeamStats) => {
    Teams.push(Team);
}

export const deleteTeam = (name: string) => {
    const exists = Teams.filter(Team => Team.name == name);
    if(exists[0] != null && exists[0].name == name){
        Teams = Teams.filter(Team => Team.name !== name)
        toast.success("Team deleted Successfully." , {
            theme: 'colored'
        })
    } else {
        toast.error('Team not found.', {
            theme: 'colored'
        })
    }
}

export const updateTeam = (
    winTeam: string,
    lossTeam: string,
    tiePtsWin: number,
    tiePtsLoss: number
) => {
    const winningTeam = Teams.find(Team => Team.name == winTeam);
    const losingTeam = Teams.find(Team => Team.name == lossTeam);

    if(winningTeam != null && losingTeam != null){
        if (winningTeam) {
            winningTeam.matches++;
            winningTeam.tieBreaker += tiePtsWin;
            winningTeam.wins++;
            winningTeam.points += 2;
        }
        if (losingTeam) {
            losingTeam.matches++;
            losingTeam.tieBreaker += tiePtsLoss;
            losingTeam.loss++;
        }
        Teams.sort((a : TeamStats,b : TeamStats) : number => {
            if (a.points != b.points) {
                return b.points - a.points;
            } else if (a.points == b.points) {
                return b.tieBreaker - a.tieBreaker;
            }
            return b.points - a.points;
        })
        toast.success(`Congrats ${winningTeam.name} on winning.`, {
            theme: 'colored'
        });
    } else {
        toast.error("Invalid Team Name(s)" , {
            theme: 'colored'
        });
    }
}

export const AllTeams = (): TeamStats[] => {
    return Teams;
}
