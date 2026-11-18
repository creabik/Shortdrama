export type Drama = {
  id: string;
  title: string;
  tags: string[];
  genre: string;
  episodes: number;
  views: number;
  hue: number; // placeholder poster color
  exclusive?: boolean;
  synopsis: string;
};

// Placeholder video – replace with your own HLS/MP4 URLs per episode.
export const SAMPLE_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export const GENRES = ["Romance", "Fantasy", "Revenge", "Billionaire", "Werewolf", "Mafia"];

export const DRAMAS: Drama[] = [
  { id: "engagement-banquet", title: "The Engagement Banquet Drama", tags: ["Romance", "Identity Twist"], genre: "Romance", episodes: 20, views: 184200, hue: 350, exclusive: true, synopsis: "At her own engagement banquet, a bride discovers who her fiancé's family really is." },
  { id: "slumber-regret", title: "After Her Long Slumber, Brothers Regret", tags: ["Female", "Identity Twist"], genre: "Revenge", episodes: 59, views: 153500, hue: 20, synopsis: "She wakes after years asleep, and the brothers who ignored her are ready to make amends." },
  { id: "hate-you-want-you", title: "I Hate You, I Want You", tags: ["Romance", "Enemies to Lovers"], genre: "Romance", episodes: 40, views: 98300, hue: 40, synopsis: "Two rivals under one roof. One impossible rule: never fall in love." },
  { id: "love-triangle-father", title: "Who Is the Father in a Love Triangle", tags: ["Drama", "Secret Baby"], genre: "Romance", episodes: 36, views: 121800, hue: 200, synopsis: "A surprise pregnancy, two suspects, and one very stubborn heart." },
  { id: "million-dollar-job", title: "My Million-Dollar Substitute Job", tags: ["Contract Marriage", "Billionaire"], genre: "Billionaire", episodes: 60, views: 162100, hue: 30, synopsis: "She took a stand-in job for one night. Now the CEO won't let her leave." },
  { id: "doctor-billionaire", title: "Ms. Doctor and Her Hidden Billionaire Husband", tags: ["Billionaire", "Hidden Identity"], genre: "Billionaire", episodes: 52, views: 77400, hue: 190, exclusive: true, synopsis: "The hospital's rising star has no idea her quiet husband owns the building." },
  { id: "secret-child-boss", title: "A Secret Child with My Wealthy Boss", tags: ["Secret Baby", "Office"], genre: "Billionaire", episodes: 48, views: 133600, hue: 140, synopsis: "Five years later, her new boss is the father of her son." },
  { id: "race-to-heart", title: "Race to My Heart", tags: ["Sports", "Romance"], genre: "Romance", episodes: 32, views: 66700, hue: 15, exclusive: true, synopsis: "A rookie driver and a team heir collide on and off the track." },
  { id: "runaway-luna", title: "Runaway Luna: Claimed by Two", tags: ["Werewolf", "Fantasy"], genre: "Werewolf", episodes: 56, views: 143900, hue: 225, exclusive: true, synopsis: "She fled her pack, but two alphas are hunting her for very different reasons." },
  { id: "merman-daddy", title: "My Merman Daddy Takes Me Home", tags: ["Supernatural", "Fantasy"], genre: "Fantasy", episodes: 44, views: 171000, hue: 205, synopsis: "Rescued from the sea by a mysterious king with a crown and a secret." },
  { id: "vampire-husband", title: "My Vampire Husband's Double Life", tags: ["Contract Marriage", "Supernatural"], genre: "Fantasy", episodes: 38, views: 162100, hue: 0, synopsis: "I married a man in a coma. Turns out, he's the vampire prince." },
  { id: "mafia-contract", title: "Mafia Contract II: The Mafia Star's Contract", tags: ["Mafia", "Contract Marriage"], genre: "Mafia", episodes: 42, views: 133600, hue: 270, synopsis: "A singer signs a contract with the wrong man, and the deal includes a ring." },
  { id: "ceo-housekeeper", title: "The CEO's Housekeeper Wife", tags: ["Family", "Billionaire"], genre: "Billionaire", episodes: 30, views: 59800, hue: 165, exclusive: true, synopsis: "She cleans his house. He doesn't know she owns half the city." },
  { id: "twin-sister-fiance", title: "Married My Twin Sister's Rich Fiancé", tags: ["Twins", "Revenge"], genre: "Revenge", episodes: 34, views: 88200, hue: 320, exclusive: true, synopsis: "A swapped wedding turns into the best revenge she never planned." },
  { id: "divorce-fabulous", title: "After Divorce, I Built a Fabulous Life", tags: ["Revenge", "Glow Up"], genre: "Revenge", episodes: 60, views: 110500, hue: 45, synopsis: "He thought the divorce would break her. It was the start of her empire." },
];

export const getDrama = (id: string) => DRAMAS.find((d) => d.id === id);

export const formatViews = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
