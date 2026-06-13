
export interface MatchSequenzeItem {
    'numero-sequenza': number,
    link: string
}

export interface MatchItem {
    id: number,
    giocatore: string,
    'secondi-trascorsi': number,
    stato: string,
    sequenza: MatchSequenzeItem[]
}

export interface MatchStatus {
    stato: string
}

export interface MatchStartingLink {
    'link-iniziale': string
}
