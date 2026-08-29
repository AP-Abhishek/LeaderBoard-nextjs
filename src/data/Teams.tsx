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
    Teams.push({
        ...Team,
        name: Team.name.trim().slice(0, 20)
    });
}

export const deleteTeam = (name: string) => {
    const trimmedName = name.trim().toLowerCase();
    const exists = Teams.find(Team => Team.name.toLowerCase() === trimmedName);
    
    if (exists) {
        Teams = Teams.filter(Team => Team.name.toLowerCase() !== trimmedName);
        toast.success("Team deleted successfully.", {
            theme: 'colored'
        });
    } else {
        toast.error('Team not found.', {
            theme: 'colored'
        });
    }
}

export const updateTeam = (
    winTeam: string,
    lossTeam: string,
    tiePtsWin: number,
    tiePtsLoss: number
) => {
    const winTrimmed = winTeam.trim().toLowerCase();
    const lossTrimmed = lossTeam.trim().toLowerCase();

    if (!winTrimmed || !lossTrimmed) {
        toast.error("Please enter both winning and losing team names.", {
            theme: 'colored'
        });
        return;
    }

    if (winTrimmed === lossTrimmed) {
        toast.error("Winning and losing teams must be different.", {
            theme: 'colored'
        });
        return;
    }

    const winningTeam = Teams.find(Team => Team.name.toLowerCase() === winTrimmed);
    const losingTeam = Teams.find(Team => Team.name.toLowerCase() === lossTrimmed);

    if (winningTeam && losingTeam) {
        const winTie = isNaN(tiePtsWin) ? 0 : tiePtsWin;
        const lossTie = isNaN(tiePtsLoss) ? 0 : tiePtsLoss;

        winningTeam.matches++;
        winningTeam.tieBreaker += winTie;
        winningTeam.wins++;
        winningTeam.points += 2;

        losingTeam.matches++;
        losingTeam.tieBreaker += lossTie;
        losingTeam.loss++;

        Teams.sort((a: TeamStats, b: TeamStats): number => {
            if (a.points !== b.points) {
                return b.points - a.points;
            }
            return b.tieBreaker - a.tieBreaker;
        });

        toast.success(`Congrats ${winningTeam.name} on winning!`, {
            theme: 'colored'
        });
    } else {
        toast.error("Invalid team name(s).", {
            theme: 'colored'
        });
    }
}

export const canEndTournament = (): { allowed: boolean; message?: string } => {
    if (Teams.length === 0) {
        return { allowed: false, message: "Cannot end tournament when no teams exist." };
    }
    const totalMatches = Teams.reduce((sum, team) => sum + team.matches, 0);
    if (totalMatches === 0) {
        return { allowed: false, message: "Cannot end tournament before playing any matches." };
    }
    return { allowed: true };
}

export const AllTeams = (): TeamStats[] => {
    return Teams;
}
