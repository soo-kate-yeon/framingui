/**
 * Classic Magazine - Article Data
 *
 * 디자인과 타이포그래피에 관한 현실적인 기사 데이터
 */

export interface Author {
  name: string;
  bio: string;
  avatar: string;
}

export interface ContentSection {
  type: 'text' | 'quote' | 'heading';
  content: string;
  level?: 2 | 3; // For heading type only
  author?: string; // For quote type only
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  author: Author;
  content: ContentSection[];
  readTime: number;
  publishDate: string;
  tags: string[];
  relatedArticles: string[];
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'The Return of the Serif: Why Print Sensitivity Matters in UI',
    subtitle:
      'As digital interfaces mature, designers are looking back to centuries of print tradition.',
    category: 'Breaking News',
    author: {
      name: 'Sooyeon Kim',
      bio: 'Sooyeon is a design systems architect and typography enthusiast with over 15 years of experience in digital product design. She has worked with Fortune 500 companies to establish design languages that bridge print and digital.',
      avatar: '/avatars/sooyeon-kim.jpg',
    },
    content: [
      {
        type: 'heading',
        level: 2,
        content: 'The Digital Design Revolution',
      },
      {
        type: 'text',
        content:
          'For decades, digital design has chased the ephemeral dream of being "modern." Rounded corners, gradient overlays, and the endless parade of sans-serif fonts became synonymous with innovation. But as the web matures and users become more sophisticated, a counter-movement is emerging: the return to print-inspired design principles.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Recognition, Not Nostalgia',
      },
      {
        type: 'text',
        content:
          "This isn't nostalgia. It's recognition that centuries of print design solved fundamental problems of hierarchy, legibility, and trust. The serif typeface, once dismissed as \"old-fashioned,\" carries with it an authority that clean sans-serif fonts struggle to match. The sharp corner, the high-contrast border, the disciplined grid—these aren't relics. They're timeless tools.",
      },
      {
        type: 'quote',
        content:
          "The best interface is one that disappears. Typography that has been refined over 500 years doesn't demand attention—it commands respect.",
        author: 'Jan Tschichold',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Print Heritage in Digital Interfaces',
      },
      {
        type: 'text',
        content:
          "Consider the New York Times, The Guardian, or any major publication. Their digital presence increasingly mirrors their print heritage. This isn't regression—it's evolution informed by tradition. When you eliminate visual noise and let content breathe, when you use type hierarchy instead of colored boxes, when you trust whitespace to create separation, you create interfaces that feel authoritative and timeless.",
      },
      {
        type: 'heading',
        level: 3,
        content: 'The Classic Magazine Aesthetic',
      },
      {
        type: 'text',
        content:
          'The "Classic Magazine" aesthetic represents this philosophy in its purest form: zero border radius, serif headlines paired with sans-serif body text, high-contrast dividers, and absolute legibility. It\'s not about being retro. It\'s about being readable, trustworthy, and built to last.',
      },
    ],
    readTime: 5,
    publishDate: '2026-02-07',
    tags: ['Typography', 'Design Systems', 'UI/UX', 'Print Design'],
    relatedArticles: ['2', '3'],
  },
  {
    id: '2',
    title: 'Typography as Architecture: Building without Containers',
    subtitle: 'Stop using cards for everything. Let the whitespace and type hierarchy do the work.',
    category: 'Design',
    author: {
      name: 'Marcus Chen',
      bio: 'Marcus is a product designer and educator based in San Francisco. His work focuses on information architecture and the intersection of content strategy and visual design.',
      avatar: '/avatars/marcus-chen.jpg',
    },
    content: [
      {
        type: 'text',
        content:
          'Modern web design has developed a crutch: the ubiquitous card component. Rounded corners, drop shadows, and nested containers have become so common that designers rarely question their necessity. But what if we removed them entirely?',
      },
      {
        type: 'text',
        content:
          "When you eliminate visual containers, you're forced to rely on the fundamental tools of typography: scale, weight, spacing, and color. This constraint doesn't limit expression—it amplifies clarity. Without the safety net of a border or shadow to group related content, every typographic decision must earn its place.",
      },
      {
        type: 'text',
        content:
          'The result is interfaces that feel more spacious, more confident, and paradoxically more structured. Like a well-designed newspaper, the hierarchy is unmistakable not because elements are contained, but because the typography itself creates clear relationships between content.',
      },
      {
        type: 'quote',
        content: 'Good typography is invisible. Great typography is architecture.',
        author: 'Massimo Vignelli',
      },
      {
        type: 'text',
        content:
          'This approach demands precision. Line lengths must be carefully considered. Spacing must follow a mathematical rhythm. Color contrast must be intentional. But the payoff is an interface that feels mature, editorial, and timeless—qualities that no amount of drop shadows can achieve.',
      },
    ],
    readTime: 4,
    publishDate: '2026-02-06',
    tags: ['Typography', 'UI Design', 'Minimalism', 'Content Design'],
    relatedArticles: ['1', '4'],
  },
  {
    id: '3',
    title: 'Why 0px Radius is the Ultimate Sophistication',
    subtitle: 'In a world of rounded corners, the sharp edge stands out.',
    category: 'Opinion',
    author: {
      name: 'Elena Rodriguez',
      bio: 'Elena is a design director and critic whose work examines the cultural implications of interface design choices. She writes regularly for major design publications.',
      avatar: '/avatars/elena-rodriguez.jpg',
    },
    content: [
      {
        type: 'text',
        content:
          "There's a curious phenomenon in modern interface design: the universal adoption of rounded corners. From iOS to Material Design, from banking apps to social networks, the border radius has become so ubiquitous that its absence feels radical.",
      },
      {
        type: 'text',
        content:
          "But radical isn't necessarily wrong. The sharp corner—the 0px border radius—carries with it a different set of associations: precision, authority, timelessness. Where the rounded corner softens and comforts, the sharp corner commands and clarifies.",
      },
      {
        type: 'quote',
        content:
          "Simplicity is not the absence of clutter. It's the absence of unnecessary decisions.",
        author: 'Dieter Rams',
      },
      {
        type: 'text',
        content:
          "Consider the context where sharp corners thrive: editorial design, financial interfaces, legal documents, academic publications. These are domains where trust and clarity trump friendliness. The sharp corner doesn't apologize for being digital. It embraces the precision that digital tools make possible.",
      },
      {
        type: 'text',
        content:
          "This isn't to say all interfaces should abandon rounded corners. But the next time you reach for that border-radius property, ask yourself: what am I trying to communicate? If the answer is authority, clarity, and timeless sophistication, perhaps the sharpest choice is no radius at all.",
      },
    ],
    readTime: 3,
    publishDate: '2026-02-05',
    tags: ['Design Philosophy', 'Visual Design', 'Interface Design'],
    relatedArticles: ['1', '2'],
  },
  {
    id: '4',
    title: 'The Grid System: From Gutenberg to CSS Grid',
    subtitle: 'How a 500-year-old printing technique became the foundation of modern web layout.',
    category: 'Technology',
    author: {
      name: 'Thomas Müller',
      bio: 'Thomas is a frontend architect and design systems consultant. He specializes in building scalable layout systems that work across platforms and screen sizes.',
      avatar: '/avatars/thomas-muller.jpg',
    },
    content: [
      {
        type: 'text',
        content:
          "When Johannes Gutenberg invented the printing press in 1440, he didn't just revolutionize communication—he established a visual language that would persist for centuries. The grid system, born from the practical constraints of movable type, became the foundation for how we organize information.",
      },
      {
        type: 'text',
        content:
          'Fast forward to today, and CSS Grid has brought that same rigor to the web. But unlike its print predecessor, CSS Grid is flexible, responsive, and capable of adapting to any screen size. Yet the principles remain unchanged: content should follow a mathematical rhythm, relationships should be clear, and the underlying structure should create harmony without calling attention to itself.',
      },
      {
        type: 'text',
        content:
          "The best grid systems are invisible. Users don't notice them—they simply experience content that feels organized, scannable, and intentional. Whether it's a 12-column layout in print or a responsive CSS Grid on the web, the goal is the same: create structure that serves content, not the other way around.",
      },
      {
        type: 'quote',
        content:
          'The grid system is an aid, not a guarantee. It permits a number of possible uses and each designer can look for a solution appropriate to his personal style.',
        author: 'Josef Müller-Brockmann',
      },
      {
        type: 'text',
        content:
          "For designers moving from print to digital, the grid is both familiar friend and new frontier. CSS Grid's ability to redefine layouts at different breakpoints means the same content can be presented in radically different ways while maintaining structural integrity. This is the promise of responsive design: not compromise, but considered adaptation.",
      },
    ],
    readTime: 6,
    publishDate: '2026-02-04',
    tags: ['CSS Grid', 'Layout Design', 'Print Design', 'Web Development'],
    relatedArticles: ['2', '5'],
  },
  {
    id: '5',
    title: 'Contrast and Hierarchy: Lessons from Newspaper Design',
    subtitle: 'What 200 years of print journalism can teach us about digital interfaces.',
    category: 'Design',
    author: {
      name: 'Aisha Patel',
      bio: 'Aisha is a UX researcher and design historian. Her work examines how traditional design principles translate to digital contexts.',
      avatar: '/avatars/aisha-patel.jpg',
    },
    content: [
      {
        type: 'text',
        content:
          "Open any major newspaper, and you'll see a masterclass in information hierarchy. Headlines dominate, subheadings provide context, body text invites reading, and visual dividers create clear sections—all without a single drop shadow or gradient.",
      },
      {
        type: 'text',
        content:
          "This is design under constraint. Newspapers can't rely on color (most are black and white), animation (it's paper), or interactive feedback. They have only typography, spacing, and contrast. And yet, they've perfected the art of guiding the reader's eye.",
      },
      {
        type: 'quote',
        content:
          "Content precedes design. Design in the absence of content is not design, it's decoration.",
        author: 'Jeffrey Zeldman',
      },
      {
        type: 'text',
        content:
          'Digital interfaces can learn from this restraint. When we rely too heavily on visual effects—shadows, gradients, animations—we risk obscuring the content itself. But when we embrace the tools of editorial design—contrast, scale, whitespace—we create interfaces that prioritize readability above all else.',
      },
      {
        type: 'text',
        content:
          "The \"Classic Magazine\" aesthetic isn't about nostalgia for print. It's about recognizing that some design problems were solved long ago, and the solutions are still relevant today. High contrast borders create clear boundaries. Serif headlines command attention. Sans-serif body text maintains readability. These aren't trends—they're fundamentals.",
      },
    ],
    readTime: 5,
    publishDate: '2026-02-03',
    tags: ['Editorial Design', 'Information Architecture', 'Typography', 'Hierarchy'],
    relatedArticles: ['1', '4'],
  },
  {
    id: '6',
    title: "Whitespace as Content: The Art of What You Don't Show",
    subtitle: 'In design, what you leave out is often more important than what you include.',
    category: 'Culture',
    author: {
      name: 'Yuki Tanaka',
      bio: 'Yuki is a minimalist designer and educator based in Tokyo. His work explores the intersection of Japanese aesthetic principles and modern interface design.',
      avatar: '/avatars/yuki-tanaka.jpg',
    },
    content: [
      {
        type: 'text',
        content:
          "In Japanese aesthetics, there's a concept called \"ma\"—the space between things. It's not empty space, but rather the interval that gives context and meaning to what surrounds it. In design, we call this whitespace, but the principle is the same: what you don't show is as important as what you do.",
      },
      {
        type: 'text',
        content:
          "Western design culture often treats whitespace as a luxury—something you add when you have room to spare. But in editorial design, whitespace is structural. It creates rhythm, establishes hierarchy, and gives the reader's eye a place to rest.",
      },
      {
        type: 'quote',
        content: 'White space is to be regarded as an active element, not a passive background.',
        author: 'Jan Tschichold',
      },
      {
        type: 'text',
        content:
          "When you remove decorative elements—rounded corners, shadows, background colors—you're left with type and space. This is where design becomes challenging. Without visual crutches, every decision about spacing becomes critical. Too little, and content feels cramped. Too much, and relationships become unclear.",
      },
      {
        type: 'text',
        content:
          "The payoff for this discipline is interfaces that feel spacious yet structured, minimal yet complete. Whitespace isn't the absence of design—it's design at its most refined. It's the confidence to show less and communicate more.",
      },
    ],
    readTime: 4,
    publishDate: '2026-02-02',
    tags: ['Minimalism', 'Visual Design', 'Japanese Aesthetics', 'Layout'],
    relatedArticles: ['2', '3'],
  },
];

/**
 * 특정 ID로 기사 찾기
 */
export function getArticleById(id: string): Article | undefined {
  return articles.find((article) => article.id === id);
}

/**
 * 특정 기사의 관련 기사 가져오기
 */
export function getRelatedArticles(articleId: string): Article[] {
  const article = getArticleById(articleId);
  if (!article) {
    return [];
  }

  return article.relatedArticles
    .map((id) => getArticleById(id))
    .filter((a): a is Article => a !== undefined);
}

/**
 * 카테고리별 기사 필터링
 */
export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((article) => article.category === category);
}

/**
 * 태그별 기사 검색
 */
export function getArticlesByTag(tag: string): Article[] {
  return articles.filter((article) => article.tags.includes(tag));
}
