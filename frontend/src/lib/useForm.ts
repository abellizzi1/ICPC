export type FormValues = {
	fname:		string;
	lname: 		string;
	email: 		string;
	pword: 		string;
	cellnum:	number;
	univ:		string;
};

export type ProblemValues = {
    probname:   string;
    linkurl:    string;
    videourl:   string;
    difficulty: number;
    category:   number;
};

export type CategoryValues = {
    id:     number;
    name:   string;
    idDef:  number;
};

export type DifficultyValues = {
    id:     number;
    name:   string;
    idDef:  number;
};

export type NewTeam = {
    orgId?: number,
    name:   string,
}
