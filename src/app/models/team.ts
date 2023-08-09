export class Team {
    constructor(
        public name: string,
        public description: string,
        public members?: string[],
        public projects?: string[],
        public profilePic?: string,
        public id?: string,
        public ownerId?: string
    ) {}
}