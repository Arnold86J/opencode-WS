// Données structurées de l'eBook "100 Expressions Indispensables" — Anne Le Grand
// Source PDF: Parlez-vous-French.com 2020
// 10 verbes x 10 expressions = 100

export type Conjugation = {
  present: string[];
  passeCompose: string[];
  imparfait: string[];
  futur: string[];
  conditionnel: string[];
  subjonctif: string[];
  imperatif: string[];
};

export type Expression = {
  id: string; // ex: E-01
  num: number; // 1..100
  title: string; // "Être mal à l'aise"
  verb: string;
  definition: string;
  example: string;
  exampleHighlight: string; // partie en orange
  register?: "familier" | "courant" | "soutenu";
  synonym?: string;
};

export type Verb = {
  slug: string;
  name: string;
  phonetic: string;
  definition: string;
  color: string;
  coverExample: string[]; // 4 exemples page de garde orange
  conjugation: Conjugation;
  expressions: Expression[];
};

export const verbs: Verb[] = [
  {
    slug: "etre",
    name: "Être",
    phonetic: "[ɛtʁ]",
    definition: "Le verbe « être » est utilisé pour « indiquer l'existence d'une personne, la réalité ou la vérité d'une chose [...] » ou pour « indiquer l'appartenance, l'origine, le lieu, le temps, l'opinion, etc. [...] ».",
    color: "#FF6B00",
    coverExample: ["« Je suis là. »", "« Ce livre est à moi. »", "« Il est midi. »", "« Je suis d'accord. »"],
    conjugation: {
      present: ["je suis","tu es","il est","nous sommes","vous êtes","ils sont"],
      passeCompose: ["j'ai été","tu as été","il a été","nous avons été","vous avez été","ils ont été"],
      imparfait: ["j'étais","tu étais","il était","nous étions","vous étiez","ils étaient"],
      futur: ["je serai","tu seras","il sera","nous serons","vous serez","ils seront"],
      conditionnel: ["je serais","tu serais","il serait","nous serions","vous seriez","ils seraient"],
      subjonctif: ["que je sois","que tu sois","qu'il soit","que nous soyons","que vous soyez","qu'ils soient"],
      imperatif: ["sois","soyons","soyez"],
    },
    expressions: [
      { id:"E-01", num:1, title:"Être mal à l'aise", verb:"Être", definition:"On utilise cette expression quand une personne est embarrassée, gênée, qu'elle se sent mal face à quelque chose ou face à quelqu'un.", example:"Je n'aime pas parler en public. Je suis vraiment mal à l'aise quand le regard des gens est tourné vers moi.", exampleHighlight:"Je suis vraiment mal à l'aise", register:"courant" },
      { id:"E-02", num:2, title:"Être largué", verb:"Être", definition:"On utilise cette expression dans un contexte familier. Quand une personne est larguée, cela signifie qu'elle ne comprend plus rien, qu'elle n'arrive plus à suivre la conversation, les explications... Cette personne est complètement perdue.", example:"Depuis qu'il a changé de professeur de mathématiques, il est complètement largué. Il va devoir prendre des cours particuliers.", exampleHighlight:"il est complètement largué", register:"familier" },
      { id:"E-03", num:3, title:"Être débordé", verb:"Être", definition:"Cette expression s'utilise quand une personne est surchargée de travail ou d'obligations à remplir.", example:"Paul n'a plus une minute à lui. Il est débordé depuis qu'il a accepté de faire des heures supplémentaires à l'hôpital.", exampleHighlight:"Il est débordé", register:"courant" },
      { id:"E-04", num:4, title:"Être en train de", verb:"Être", definition:"Cette expression familière est utilisée pour parler d'une action qui est en cours de réalisation, d'une action qui se déroule au moment où la personne parle.", example:"Quand je suis rentrée à la maison, il était en train de dormir.", exampleHighlight:"il était en train de dormir", register:"familier" },
      { id:"E-05", num:5, title:"Être au courant de", verb:"Être", definition:"Cette expression signifie qu'une personne sait quelque chose, qu'elle est informée, avertie de quelque chose.", example:"Tu es au courant que Julie est enceinte ?", exampleHighlight:"Tu es au courant", register:"courant" },
      { id:"E-06", num:6, title:"Être aux anges", verb:"Être", definition:"Quand une personne est aux anges, cela signifie qu'elle est très heureuse.", example:"Depuis qu'elle est mariée, elle est aux anges.", exampleHighlight:"elle est aux anges", register:"courant" },
      { id:"E-07", num:7, title:"Être dans le rouge", verb:"Être", definition:"Cette expression familière signifie qu'une personne est endettée, qu'elle n'a plus d'argent sur son compte bancaire. On peut également utiliser une autre expression synonyme « être à découvert ».", example:"Tu peux me prêter 25€ ? Je suis dans le rouge ce mois-ci.", exampleHighlight:"Je suis dans le rouge", register:"familier", synonym:"être à découvert" },
      { id:"E-08", num:8, title:"Être dur d'oreille", verb:"Être", definition:"Cette expression signifie qu'une personne n'entend pas très bien, autrement dit qu'elle est un peu sourde. On peut également utiliser une autre expression synonyme « être dur de la feuille ».", example:"Parle plus fort ! Tu sais bien que ton grand-père est dur d'oreille.", exampleHighlight:"est dur d'oreille", register:"courant", synonym:"être dur de la feuille" },
      { id:"E-09", num:9, title:"Être à la bourre", verb:"Être", definition:"Cette expression familière signifie « être en retard ».", example:"Le réveil n'a pas sonné. Je vais encore être à la bourre !", exampleHighlight:"être à la bourre", register:"familier" },
      { id:"E-10", num:10, title:"Être barbouillé", verb:"Être", definition:"Cette expression est utilisée pour parler d'une personne qui ne se sent pas bien, généralement elle a mal au ventre à cause d'une chose qu'elle a mangée.", example:"Je suis barbouillée depuis tout à l'heure. Je crois que c'est à cause du sandwich que j'ai mangé.", exampleHighlight:"Je suis barbouillée", register:"courant" },
    ]
  },
  {
    slug: "avoir",
    name: "Avoir",
    phonetic: "[avwaʁ]",
    definition: "Le verbe « avoir » signifie qu' « une personne possède quelque chose [...], » « éprouve un sentiment, présente telle caractéristique [...] » ou qu' « une chose comporte, contient, présente une ou plusieurs caractéristiques [...] ».",
    color: "#FF6B00",
    coverExample: ["« Il a de l'admiration pour sa fille. »", "« Elle a les yeux bleus. »", "« Ma maison a trois étages. »"],
    conjugation: {
      present: ["j'ai","tu as","il a","nous avons","vous avez","ils ont"],
      passeCompose: ["j'ai eu","tu as eu","il a eu","nous avons eu","vous avez eu","ils ont eu"],
      imparfait: ["j'avais","tu avais","il avait","nous avions","vous aviez","ils avaient"],
      futur: ["j'aurai","tu auras","il aura","nous aurons","vous aurez","ils auront"],
      conditionnel: ["j'aurais","tu aurais","il aurait","nous aurions","vous auriez","ils auraient"],
      subjonctif: ["que j'aie","que tu aies","qu'il ait","que nous ayons","que vous ayez","qu'ils aient"],
      imperatif: ["aie","ayons","ayez"],
    },
    expressions: [
      { id:"E-11", num:11, title:"Avoir le cafard", verb:"Avoir", definition:"Avoir le moral à zéro, être déprimé, triste.", example:"Depuis qu'il a perdu son emploi, il a le cafard.", exampleHighlight:"il a le cafard" },
      { id:"E-12", num:12, title:"Avoir un coup de cœur", verb:"Avoir", definition:"Avoir une attirance soudaine et forte pour quelque chose ou quelqu'un.", example:"J'ai eu un coup de cœur pour cette petite librairie à Montmartre.", exampleHighlight:"un coup de cœur" },
      { id:"E-13", num:13, title:"Avoir du bol", verb:"Avoir", definition:"Avoir de la chance. Expression très familière.", example:"T'as eu du bol, le contrôleur n'est pas passé !", exampleHighlight:"du bol", register:"familier" },
      { id:"E-14", num:14, title:"Avoir la pêche", verb:"Avoir", definition:"Être en pleine forme, plein d'énergie.", example:"Ce matin j'ai la pêche, j'ai envie de tout faire !", exampleHighlight:"j'ai la pêche", register:"familier" },
      { id:"E-15", num:15, title:"Avoir beau", verb:"Avoir", definition:"Faire des efforts sans résultat : « avoir beau faire quelque chose ».", example:"J'ai beau réviser, je n'arrive pas à retenir les conjugaisons.", exampleHighlight:"J'ai beau réviser" },
      { id:"E-16", num:16, title:"Avoir hâte de", verb:"Avoir", definition:"Attendre quelque chose avec impatience et joie.", example:"J'ai hâte de partir en vacances la semaine prochaine !", exampleHighlight:"J'ai hâte de partir" },
      { id:"E-17", num:17, title:"En avoir marre", verb:"Avoir", definition:"Être agacé, en avoir assez, ne plus supporter.", example:"J'en ai marre d'être à la bourre tous les matins !", exampleHighlight:"J'en ai marre" },
      { id:"E-18", num:18, title:"Avoir la main verte", verb:"Avoir", definition:"Être doué pour s'occuper des plantes.", example:"Chez elle tout pousse, elle a vraiment la main verte.", exampleHighlight:"la main verte" },
      { id:"E-19", num:19, title:"Avoir un poil dans la main", verb:"Avoir", definition:"Être très paresseux (familier, humoristique).", example:"Il a un poil dans la main, il ne fait jamais la vaisselle.", exampleHighlight:"un poil dans la main", register:"familier" },
      { id:"E-20", num:20, title:"Avoir d'autres chats à fouetter", verb:"Avoir", definition:"Avoir d'autres choses plus importantes à faire.", example:"Désolée, j'ai d'autres chats à fouetter en ce moment.", exampleHighlight:"d'autres chats à fouetter" },
    ]
  },
  {
    slug: "faire",
    name: "Faire",
    phonetic: "[fɛʁ]",
    definition: "Le verbe « faire » est l'un des verbes les plus polyvalents : il indique l'action, la réalisation, la fabrication ou encore l'effet.",
    color: "#FF6B00",
    coverExample: ["« Il fait beau aujourd'hui. »", "« Qu'est-ce que tu fais ce soir ? »", "« Faire la cuisine »"],
    conjugation: {
      present: ["je fais","tu fais","il fait","nous faisons","vous faites","ils font"],
      passeCompose: ["j'ai fait","tu as fait","il a fait","nous avons fait","vous avez fait","ils ont fait"],
      imparfait: ["je faisais","tu faisais","il faisait","nous faisions","vous faisiez","ils faisaient"],
      futur: ["je ferai","tu feras","il fera","nous ferons","vous ferez","ils feront"],
      conditionnel: ["je ferais","tu ferais","il ferait","nous ferions","vous feriez","ils feraient"],
      subjonctif: ["que je fasse","que tu fasses","qu'il fasse","que nous fassions","que vous fassiez","qu'ils fassent"],
      imperatif: ["fais","faisons","faites"],
    },
    expressions: [
      { id:"E-21", num:21, title:"Faire la grasse matinée", verb:"Faire", definition:"Dormir tard le matin, se lever tard.", example:"Le dimanche, j'adore faire la grasse matinée jusqu'à midi.", exampleHighlight:"faire la grasse matinée" },
      { id:"E-22", num:22, title:"Faire d'une pierre deux coups", verb:"Faire", definition:"Réaliser deux objectifs avec une seule action.", example:"En allant à Lyon je fais d'une pierre deux coups : voir ma sœur et passer un entretien.", exampleHighlight:"d'une pierre deux coups" },
      { id:"E-23", num:23, title:"Faire la tête", verb:"Faire", definition:"Bouger, être de mauvaise humeur et le montrer.", example:"Depuis qu'on lui a refusé sa promotion, il fait la tête.", exampleHighlight:"il fait la tête" },
      { id:"E-24", num:24, title:"Faire le pont", verb:"Faire", definition:"Ne pas travailler un jour entre un jour férié et le week-end.", example:"Le 14 juillet tombe un jeudi, on va faire le pont vendredi.", exampleHighlight:"faire le pont" },
      { id:"E-25", num:25, title:"Se faire des films", verb:"Faire", definition:"Imaginer des choses qui n'existent pas, s'inquiéter pour rien.", example:"Arrête de te faire des films, tout va bien se passer.", exampleHighlight:"te faire des films" },
      { id:"E-26", num:26, title:"Faire gaffe", verb:"Faire", definition:"Faire attention (familier).", example:"Fais gaffe, le sol est glissant !", exampleHighlight:"Fais gaffe", register:"familier" },
      { id:"E-27", num:27, title:"Ça ne fait rien", verb:"Faire", definition:"Ce n'est pas grave, ça n'a pas d'importance.", example:"Tu as oublié ton livre ? Ça ne fait rien, je te prêterai le mien.", exampleHighlight:"Ça ne fait rien" },
      { id:"E-28", num:28, title:"Faire un tabac", verb:"Faire", definition:"Avoir un grand succès.", example:"Sa nouvelle pièce de théâtre fait un tabac à Paris.", exampleHighlight:"fait un tabac" },
      { id:"E-29", num:29, title:"Faire avec", verb:"Faire", definition:"S'accommoder d'une situation, ne pas avoir le choix.", example:"On n'a plus de beurre, il va falloir faire avec.", exampleHighlight:"faire avec" },
      { id:"E-30", num:30, title:"Faire la sourde oreille", verb:"Faire", definition:"Faire semblant de ne pas entendre.", example:"Je lui ai demandé de ranger sa chambre mais il fait la sourde oreille.", exampleHighlight:"fait la sourde oreille" },
    ]
  },
  {
    slug: "dire",
    name: "Dire",
    phonetic: "[diʁ]",
    definition: "Le verbe « dire » sert à exprimer par la parole, à communiquer une information, une opinion.",
    color: "#FF6B00",
    coverExample: ["« Que veux-tu dire ? »", "« On dit qu'il va neiger. »", "« Dis donc ! »"],
    conjugation: {
      present: ["je dis","tu dis","il dit","nous disons","vous dites","ils disent"],
      passeCompose: ["j'ai dit","tu as dit","il a dit","nous avons dit","vous avez dit","ils ont dit"],
      imparfait: ["je disais","tu disais","il disait","nous disions","vous disiez","ils disaient"],
      futur: ["je dirai","tu diras","il dira","nous dirons","vous direz","ils diront"],
      conditionnel: ["je dirais","tu dirais","il dirait","nous dirions","vous diriez","ils diraient"],
      subjonctif: ["que je dise","que tu dises","qu'il dise","que nous disions","que vous disiez","qu'ils disent"],
      imperatif: ["dis","disons","dites"],
    },
    expressions: [
      { id:"E-31", num:31, title:"C'est-à-dire", verb:"Dire", definition:"Préciser, expliquer plus clairement.", example:"Je suis flexitarien, c'est-à-dire que je mange très peu de viande.", exampleHighlight:"c'est-à-dire" },
      { id:"E-32", num:32, title:"Dire des bêtises", verb:"Dire", definition:"Dire des choses sans importance, fausses ou stupides.", example:"Ne l'écoute pas, il ne fait que dire des bêtises.", exampleHighlight:"dire des bêtises" },
      { id:"E-33", num:33, title:"À vrai dire", verb:"Dire", definition:"Pour dire la vérité, en réalité.", example:"À vrai dire, je n'ai pas trop aimé ce film.", exampleHighlight:"À vrai dire" },
      { id:"E-34", num:34, title:"Ça va sans dire", verb:"Dire", definition:"C'est évident, pas besoin de le préciser.", example:"Ça va sans dire qu'on t'aidera si tu as besoin.", exampleHighlight:"Ça va sans dire" },
      { id:"E-35", num:35, title:"Dis donc !", verb:"Dire", definition:"Exprime la surprise, l'étonnement.", example:"Dis donc, tu as changé de coupe de cheveux ! Ça te va bien.", exampleHighlight:"Dis donc" },
      { id:"E-36", num:36, title:"Vouloir dire", verb:"Dire", definition:"Signifier, avoir pour sens.", example:"Que veut dire l'expression 'tomber dans les pommes' ?", exampleHighlight:"veut dire" },
      { id:"E-37", num:37, title:"Entendre dire que", verb:"Dire", definition:"Apprendre une information par une autre personne, par ouï-dire.", example:"J'ai entendu dire que l'école allait fermer une classe.", exampleHighlight:"J'ai entendu dire" },
      { id:"E-38", num:38, title:"Pour ainsi dire", verb:"Dire", definition:"Presque, quasiment.", example:"Il a plu tous les jours, pour ainsi dire on n'est jamais sortis.", exampleHighlight:"pour ainsi dire" },
      { id:"E-39", num:39, title:"Cela dit", verb:"Dire", definition:"Pourtant, néanmoins (introduit une nuance).", example:"Ce restaurant est cher. Cela dit, la cuisine est excellente.", exampleHighlight:"Cela dit" },
      { id:"E-40", num:40, title:"Blague à part", verb:"Dire", definition:"Sérieusement, sans plaisanter.", example:"Blague à part, tu devrais vraiment te reposer.", exampleHighlight:"Blague à part" },
    ]
  },
  {
    slug: "pouvoir",
    name: "Pouvoir",
    phonetic: "[puvwaʁ]",
    definition: "Le verbe « pouvoir » exprime la capacité, la possibilité ou la permission.",
    color: "#FF6B00",
    coverExample: ["« Je peux venir demain. »", "« Il ne peut pas s'empêcher de rire. »"],
    conjugation: {
      present: ["je peux / puis","tu peux","il peut","nous pouvons","vous pouvez","ils peuvent"],
      passeCompose: ["j'ai pu","tu as pu","il a pu","nous avons pu","vous avez pu","ils ont pu"],
      imparfait: ["je pouvais","tu pouvais","il pouvait","nous pouvions","vous pouviez","ils pouvaient"],
      futur: ["je pourrai","tu pourras","il pourra","nous pourrons","vous pourrez","ils pourront"],
      conditionnel: ["je pourrais","tu pourrais","il pourrait","nous pourrions","vous pourriez","ils pourraient"],
      subjonctif: ["que je puisse","que tu puisses","qu'il puisse","que nous puissions","que vous puissiez","qu'ils puissent"],
      imperatif: ["—","—","—"],
    },
    expressions: [
      { id:"E-41", num:41, title:"N'en pouvoir plus", verb:"Pouvoir", definition:"Être épuisé, à bout de forces.", example:"J'ai couru 10 km, je n'en peux plus !", exampleHighlight:"je n'en peux plus" },
      { id:"E-42", num:42, title:"Ça se peut", verb:"Pouvoir", definition:"C'est possible (familier, courant au Québec et Belgium).", example:"Il a oublié ? Ça se peut, il est très distrait.", exampleHighlight:"Ça se peut" },
      { id:"E-43", num:43, title:"Il se peut que", verb:"Pouvoir", definition:"Il est possible que (suivi du subjonctif).", example:"Il se peut qu'il pleuve demain.", exampleHighlight:"Il se peut qu'il pleuve" },
      { id:"E-44", num:44, title:"On verra bien", verb:"Pouvoir", definition:"On pourra vérifier plus tard, laissons faire.", example:"On verra bien si son projet fonctionne.", exampleHighlight:"On verra bien" },
      { id:"E-45", num:45, title:"Autant que possible", verb:"Pouvoir", definition:"Dans la mesure du possible.", example:"J'essaie de manger sainement autant que possible.", exampleHighlight:"autant que possible" },
      { id:"E-46", num:46, title:"Je n'y peux rien", verb:"Pouvoir", definition:"Je ne peux rien y faire, ce n'est pas ma faute.", example:"Désolé, je n'y peux rien si le train est en retard.", exampleHighlight:"je n'y peux rien" },
      { id:"E-47", num:47, title:"Puisse-t-il", verb:"Pouvoir", definition:"Souhait (formule soutenue).", example:"Puisse-t-il réussir son examen !", exampleHighlight:"Puisse-t-il réussir" },
      { id:"E-48", num:48, title:"En vouloir à quelqu'un de pouvoir", verb:"Pouvoir", definition:"Être jaloux de la capacité de quelqu'un.", example:"Il peut tout se permettre, c'est agaçant.", exampleHighlight:"peut tout se permettre" },
      { id:"E-49", num:49, title:"Ne plus pouvoir se voir en peinture", verb:"Pouvoir", definition:"Ne plus supporter quelqu'un.", example:"Depuis leur dispute, ils ne peuvent plus se voir en peinture.", exampleHighlight:"ne peuvent plus se voir en peinture", register:"familier" },
      { id:"E-50", num:50, title:"Tant bien que mal", verb:"Pouvoir", definition:"Avec difficulté, malgré les obstacles.", example:"J'ai fini l'exposé tant bien que mal.", exampleHighlight:"tant bien que mal" },
    ]
  },
  {
    slug: "aller",
    name: "Aller",
    phonetic: "[ale]",
    definition: "Le verbe « aller » indique le déplacement, mais aussi l'état de santé ou la convenance.",
    color: "#FF6B00",
    coverExample: ["« Comment vas-tu ? »", "« Ça va bien. »", "« Allons-y ! »"],
    conjugation: {
      present: ["je vais","tu vas","il va","nous allons","vous allez","ils vont"],
      passeCompose: ["je suis allé(e)","tu es allé(e)","il est allé","nous sommes allé(e)s","vous êtes allé(e)s","ils sont allés"],
      imparfait: ["j'allais","tu allais","il allait","nous allions","vous alliez","ils allaient"],
      futur: ["j'irai","tu iras","il ira","nous irons","vous irez","ils iront"],
      conditionnel: ["j'irais","tu irais","il irait","nous irions","vous iriez","ils iraient"],
      subjonctif: ["que j'aille","que tu ailles","qu'il aille","que nous allions","que vous alliez","qu'ils aillent"],
      imperatif: ["va","allons","allez"],
    },
    expressions: [
      { id:"E-51", num:51, title:"Aller de soi", verb:"Aller", definition:"Être évident, naturel.", example:"Que tu sois fatiguée après ce marathon va de soi.", exampleHighlight:"va de soi" },
      { id:"E-52", num:52, title:"S'en aller", verb:"Aller", definition:"Partir, quitter un lieu.", example:"Il s'en est allé sans dire au revoir.", exampleHighlight:"s'en est allé" },
      { id:"E-53", num:53, title:"Aller bon train", verb:"Aller", definition:"Avancer rapidement.", example:"Les préparatifs du mariage vont bon train.", exampleHighlight:"vont bon train" },
      { id:"E-54", num:54, title:"Y aller au culot", verb:"Aller", definition:"Oser avec audace, sans préparation (familier).", example:"Elle n'avait pas révisé mais elle y est allée au culot et a réussi.", exampleHighlight:"au culot", register:"familier" },
      { id:"E-55", num:55, title:"Aller comme un gant", verb:"Aller", definition:"Convenir parfaitement (pour un vêtement ou une situation).", example:"Cette robe te va comme un gant !", exampleHighlight:"comme un gant" },
      { id:"E-56", num:56, title:"Ça va de soi", verb:"Aller", definition:"C'est évident.", example:"Ça va de soi qu'on partagera les frais.", exampleHighlight:"Ça va de soi" },
      { id:"E-57", num:57, title:"Aller droit au but", verb:"Aller", definition:"Parler sans détour.", example:"Arrête de tourner autour du pot, va droit au but !", exampleHighlight:"va droit au but" },
      { id:"E-58", num:58, title:"Allez savoir !", verb:"Aller", definition:"On ne sait pas, qui sait ?", example:"Pourquoi il a démissionné ? Allez savoir !", exampleHighlight:"Allez savoir" },
      { id:"E-59", num:59, title:"S'en aller en fumée", verb:"Aller", definition:"Disparaître, être anéanti (pour un projet, un espoir).", example:"Tous ses efforts sont partis en fumée.", exampleHighlight:"partis en fumée" },
      { id:"E-60", num:60, title:"Aller de mal en pis", verb:"Aller", definition:"Devenir de pire en pire.", example:"Sa santé va de mal en pis depuis l'hiver.", exampleHighlight:"de mal en pis" },
    ]
  },
  {
    slug: "voir",
    name: "Voir",
    phonetic: "[vwaʁ]",
    definition: "Le verbe « voir » signifie percevoir par la vue, mais aussi comprendre ou fréquenter.",
    color: "#FF6B00",
    coverExample: ["« Tu vois ce que je veux dire ? »", "« On se voit demain ! »"],
    conjugation: {
      present: ["je vois","tu vois","il voit","nous voyons","vous voyez","ils voient"],
      passeCompose: ["j'ai vu","tu as vu","il a vu","nous avons vu","vous avez vu","ils ont vu"],
      imparfait: ["je voyais","tu voyais","il voyait","nous voyions","vous voyiez","ils voyaient"],
      futur: ["je verrai","tu verras","il verra","nous verrons","vous verrez","ils verront"],
      conditionnel: ["je verrais","tu verrais","il verrait","nous verrions","vous verriez","ils verraient"],
      subjonctif: ["que je voie","que tu voies","qu'il voie","que nous voyions","que vous voyiez","qu'ils voient"],
      imperatif: ["vois","voyons","voyez"],
    },
    expressions: [
      { id:"E-61", num:61, title:"Voir le jour", verb:"Voir", definition:"Apparaître, être créé ou publié pour la première fois.", example:"Son premier roman a vu le jour en 2019.", exampleHighlight:"a vu le jour" },
      { id:"E-62", num:62, title:"N'y voir que du feu", verb:"Voir", definition:"Ne rien remarquer, se faire tromper complètement.", example:"Elle a menti et personne n'y a vu que du feu.", exampleHighlight:"n'y a vu que du feu" },
      { id:"E-63", num:63, title:"Voir rouge", verb:"Voir", definition:"S'énerver très fortement, être en colère.", example:"Quand on lui a rayé sa voiture, il a vu rouge.", exampleHighlight:"a vu rouge" },
      { id:"E-64", num:64, title:"Avoir beau voir", verb:"Voir", definition:"Voir clair, avoir du discernement.", example:"On voit bien que tu n'as pas révisé !", exampleHighlight:"On voit bien" },
      { id:"E-65", num:65, title:"Voir la vie en rose", verb:"Voir", definition:"Être optimiste, voir tout positivement.", example:"Depuis qu'elle est amoureuse, elle voit la vie en rose.", exampleHighlight:"voit la vie en rose" },
      { id:"E-66", num:66, title:"Ne pas voir plus loin que le bout de son nez", verb:"Voir", definition:"Manquer de perspective, être peu prévoyant.", example:"Il ne voit pas plus loin que le bout de son nez.", exampleHighlight:"pas plus loin que le bout de son nez" },
      { id:"E-67", num:67, title:"Faire voir de toutes les couleurs", verb:"Voir", definition:"Donner beaucoup de difficultés à quelqu'un.", example:"Ce client leur en a fait voir de toutes les couleurs.", exampleHighlight:"voir de toutes les couleurs" },
      { id:"E-68", num:68, title:"Au revoir !", verb:"Voir", definition:"Formule pour saluer au moment de se quitter.", example:"Au revoir et à bientôt !", exampleHighlight:"Au revoir" },
      { id:"E-69", num:69, title:"Voyons voir", verb:"Voir", definition:"Attendons de voir, examinons.", example:"Voyons voir ce que tu as fait.", exampleHighlight:"Voyons voir" },
      { id:"E-70", num:70, title:"Avoir à voir avec", verb:"Voir", definition:"Avoir un lien, un rapport.", example:"Cette histoire n'a rien à voir avec moi.", exampleHighlight:"n'a rien à voir" },
    ]
  },
  {
    slug: "savoir",
    name: "Savoir",
    phonetic: "[savwaʁ]",
    definition: "Le verbe « savoir » indique la connaissance, la capacité apprise ou la certitude.",
    color: "#FF6B00",
    coverExample: ["« Je sais parler français. »", "« On ne sait jamais ! »"],
    conjugation: {
      present: ["je sais","tu sais","il sait","nous savons","vous savez","ils savent"],
      passeCompose: ["j'ai su","tu as su","il a su","nous avons su","vous avez su","ils ont su"],
      imparfait: ["je savais","tu savais","il savait","nous savions","vous saviez","ils savaient"],
      futur: ["je saurai","tu sauras","il saura","nous saurons","vous saurez","ils sauront"],
      conditionnel: ["je saurais","tu saurais","il saurait","nous saurions","vous sauriez","ils sauraient"],
      subjonctif: ["que je sache","que tu saches","qu'il sache","que nous sachions","que vous sachiez","qu'ils sachent"],
      imperatif: ["sache","sachons","sachez"],
    },
    expressions: [
      { id:"E-71", num:71, title:"Savoir de quoi on parle", verb:"Savoir", definition:"Connaître bien le sujet.", example:"Écoute-le, il sait de quoi il parle, il est médecin.", exampleHighlight:"sait de quoi il parle" },
      { id:"E-72", num:72, title:"En savoir long", verb:"Savoir", definition:"Être bien informé, connaître beaucoup de choses.", example:"Elle en sait long sur l'histoire de l'art.", exampleHighlight:"en sait long" },
      { id:"E-73", num:73, title:"À savoir", verb:"Savoir", definition:"C'est-à-dire, autrement dit (précision).", example:"Il faut apporter deux choses, à savoir une pièce d'identité et un justificatif.", exampleHighlight:"à savoir" },
      { id:"E-74", num:74, title:"Ne plus savoir où donner de la tête", verb:"Savoir", definition:"Être débordé, ne plus savoir quoi faire en premier.", example:"Avec trois enfants malades, elle ne sait plus où donner de la tête.", exampleHighlight:"ne sait plus où donner de la tête" },
      { id:"E-75", num:75, title:"Savoir se tenir", verb:"Savoir", definition:"Se comporter correctement.", example:"Les enfants savent se tenir à table maintenant.", exampleHighlight:"savoir se tenir" },
      { id:"E-76", num:76, title:"Pas que je sache", verb:"Savoir", definition:"Pas à ma connaissance.", example:"Il y a eu un problème ? - Pas que je sache.", exampleHighlight:"Pas que je sache" },
      { id:"E-77", num:77, title:"Savoir gré à quelqu'un", verb:"Savoir", definition:"Être reconnaissant (soutenu).", example:"Je vous saurais gré de me répondre rapidement.", exampleHighlight:"saurais gré" },
      { id:"E-78", num:78, title:"On ne sait jamais", verb:"Savoir", definition:"Il faut prévoir, on ne peut pas prévoir.", example:"Prends un parapluie, on ne sait jamais !", exampleHighlight:"On ne sait jamais" },
      { id:"E-79", num:79, title:"Savoir y faire", verb:"Savoir", definition:"Avoir du tact, du savoir-faire relationnel.", example:"Avec les clients difficiles, elle sait y faire.", exampleHighlight:"sait y faire" },
      { id:"E-80", num:80, title:"Que je sache", verb:"Savoir", definition:"À ma connaissance (pour nuancer).", example:"Que je sache, il n'a jamais été en retard.", exampleHighlight:"Que je sache" },
    ]
  },
  {
    slug: "vouloir",
    name: "Vouloir",
    phonetic: "[vulwaʁ]",
    definition: "Le verbe « vouloir » exprime la volonté, le désir ou l'intention.",
    color: "#FF6B00",
    coverExample: ["« Je veux apprendre le français. »", "« Vouloir c'est pouvoir. »"],
    conjugation: {
      present: ["je veux","tu veux","il veut","nous voulons","vous voulez","ils veulent"],
      passeCompose: ["j'ai voulu","tu as voulu","il a voulu","nous avons voulu","vous avez voulu","ils ont voulu"],
      imparfait: ["je voulais","tu voulais","il voulait","nous voulions","vous vouliez","ils voulaient"],
      futur: ["je voudrai","tu voudras","il voudra","nous voudrons","vous voudrez","ils voudront"],
      conditionnel: ["je voudrais","tu voudrais","il voudrait","nous voudrions","vous voudriez","ils voudraient"],
      subjonctif: ["que je veuille","que tu veuilles","qu'il veuille","que nous voulions","que vous vouliez","qu'ils veuillent"],
      imperatif: ["veuille","veuillons","veuillez"],
    },
    expressions: [
      { id:"E-81", num:81, title:"Vouloir c'est pouvoir", verb:"Vouloir", definition:"Quand on veut vraiment quelque chose, on trouve les moyens.", example:"Elle a appris le français en 6 mois seule : vouloir c'est pouvoir !", exampleHighlight:"Vouloir c'est pouvoir" },
      { id:"E-82", num:82, title:"En vouloir à quelqu'un", verb:"Vouloir", definition:"Être fâché contre quelqu'un, lui garder rancune.", example:"Je lui en veux de ne pas m'avoir prévenue.", exampleHighlight:"lui en veux" },
      { id:"E-83", num:83, title:"Sans le vouloir", verb:"Vouloir", definition:"Involontairement, sans faire exprès.", example:"Je t'ai vexé sans le vouloir, excuse-moi.", exampleHighlight:"Sans le vouloir" },
      { id:"E-84", num:84, title:"Que veux-tu", verb:"Vouloir", definition:"Expression de résignation.", example:"Que veux-tu, c'est la vie !", exampleHighlight:"Que veux-tu" },
      { id:"E-85", num:85, title:"Veux-tu, veux-tu pas", verb:"Vouloir", definition:"De gré ou de force.", example:"Il va falloir y aller, veux-tu veux-tu pas.", exampleHighlight:"veux-tu veux-tu pas" },
      { id:"E-86", num:86, title:"S'en vouloir", verb:"Vouloir", definition:"Regretter, se reprocher quelque chose.", example:"Elle s'en veut de ne pas avoir osé parler.", exampleHighlight:"s'en veut" },
      { id:"E-87", num:87, title:"Vouloir bien", verb:"Vouloir", definition:"Accepter, être d'accord (poli).", example:"Je veux bien t'aider pour ton déménagement.", exampleHighlight:"Je veux bien t'aider" },
      { id:"E-88", num:88, title:"Ne pas vouloir en démordre", verb:"Vouloir", definition:"Maintenir fermement son opinion.", example:"Il ne veut pas en démordre : il a raison selon lui.", exampleHighlight:"ne veut pas en démordre" },
      { id:"E-89", num:89, title:"Vouloir du bien à quelqu'un", verb:"Vouloir", definition:"Avoir de bonnes intentions envers quelqu'un.", example:"Je te dis ça parce que je te veux du bien.", exampleHighlight:"te veux du bien" },
      { id:"E-90", num:90, title:"Comme tu veux", verb:"Vouloir", definition:"Comme tu préfères, peu importe pour moi.", example:"On mange quoi ? - Comme tu veux.", exampleHighlight:"Comme tu veux" },
    ]
  },
  {
    slug: "venir",
    name: "Venir",
    phonetic: "[vəniʁ]",
    definition: "Le verbe « venir » indique le déplacement vers le lieu où l'on se trouve ou l'origine.",
    color: "#FF6B00",
    coverExample: ["« Je viens de Paris. »", "« Viens voir ! »", "« Ça vient de sortir. »"],
    conjugation: {
      present: ["je viens","tu viens","il vient","nous venons","vous venez","ils viennent"],
      passeCompose: ["je suis venu(e)","tu es venu(e)","il est venu","nous sommes venu(e)s","vous êtes venu(e)s","ils sont venus"],
      imparfait: ["je venais","tu venais","il venait","nous venions","vous veniez","ils venaient"],
      futur: ["je viendrai","tu viendras","il viendra","nous viendrons","vous viendrez","ils viendront"],
      conditionnel: ["je viendrais","tu viendrais","il viendrait","nous viendrions","vous vendriez","ils viendraient"],
      subjonctif: ["que je vienne","que tu viennes","qu'il vienne","que nous venions","que vous veniez","qu'ils viennent"],
      imperatif: ["viens","venons","venez"],
    },
    expressions: [
      { id:"E-91", num:91, title:"Venir de", verb:"Venir", definition:"Action qui vient de se terminer (passé récent).", example:"Je viens de finir l'ebook, il est super !", exampleHighlight:"Je viens de finir" },
      { id:"E-92", num:92, title:"Faire venir", verb:"Venir", definition:"Faire en sorte que quelqu'un se déplace.", example:"Il a fait venir un médecin à domicile.", exampleHighlight:"fait venir" },
      { id:"E-93", num:93, title:"S'en venir", verb:"Venir", definition:"Arriver progressivement (familier).", example:"L'hiver s'en vient, il commence à faire froid.", exampleHighlight:"s'en vient" },
      { id:"E-94", num:94, title:"Voir venir", verb:"Venir", definition:"Anticiper, comprendre les intentions.", example:"Je l'ai vu venir avec ses compliments intéressés.", exampleHighlight:"vu venir" },
      { id:"E-95", num:95, title:"D'où tu viens ?", verb:"Venir", definition:"Quelle est ton origine ?", example:"D'où viens-tu ? - Je viens du Brésil.", exampleHighlight:"D'où viens-tu" },
      { id:"E-96", num:96, title:"À venir", verb:"Venir", definition:"Futur, qui arrive bientôt.", example:"Les prochains jours à venir s'annoncent ensoleillés.", exampleHighlight:"à venir" },
      { id:"E-97", num:97, title:"En venir à", verb:"Venir", definition:"Arriver à un point, à une conclusion.", example:"Où veux-tu en venir avec cette histoire ?", exampleHighlight:"en venir" },
      { id:"E-98", num:98, title:"Venir au monde", verb:"Venir", definition:"Naître.", example:"Son bébé vient de venir au monde hier.", exampleHighlight:"venir au monde" },
      { id:"E-99", num:99, title:"Venir aux mains", verb:"Venir", definition:"Se battre physiquement.", example:"Ils en sont venus aux mains après la dispute.", exampleHighlight:"venus aux mains" },
      { id:"E-100", num:100, title:"Faire venir l'eau à la bouche", verb:"Venir", definition:"Donner envie, mettre en appétit.", example:"Ce gâteau au chocolat me fait venir l'eau à la bouche.", exampleHighlight:"venir l'eau à la bouche" },
    ]
  },
];

export const allExpressions = verbs.flatMap(v => v.expressions);
export const verbBySlug = (slug: string) => verbs.find(v => v.slug === slug);
