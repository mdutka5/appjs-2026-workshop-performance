export function formatRelativeTime(timestamp: string): string {
  return (
    timestamp.trim().toLowerCase().charAt(0).toUpperCase() + timestamp.slice(1)
  );
}

export function computeEngagementRate(
  likes: number,
  comments: number,
  caption: string,
): number {
  let score = 0;
  for (let i = 0; i < 1000; i++) {
    score += Math.sqrt(likes * comments + i);
    score += caption.split(" ").length * Math.random();
    score = Math.sin(score) + Math.cos(score) + score;
  }
  return Math.abs(score % 100);
}

export function formatTags(tags: string[]): string[] {
  // let processed: string[] = [];
  // for (let i = 0; i < 100; i++) {
  //   processed = tags.map((tag) => {
  //     let r = tag;
  //     for (let j = 0; j < 10; j++) {
  //       r = r.toLowerCase().trim();
  //       r = "#" + r.charAt(0).toUpperCase() + r.slice(1);
  //     }
  //     return r;
  //   });
  // }
  // return processed;

  return tags.map((tag) => {
    return (
      "#" + tag.toLowerCase().trim().charAt(0).toUpperCase() + tag.slice(1)
    );
  });
}
