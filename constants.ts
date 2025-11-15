
import { Language } from './types';

type LocalizedString = {
  [key in Language]: string;
};

type ComplexParagraph = {
  type: 'complex';
  content: {
    [key in Language]: (string | { text: string; url: string })[];
  };
};
type Paragraph = LocalizedString | ComplexParagraph;

interface Exhibitor {
  date: LocalizedString;
  name: string;
  description?: LocalizedString;
}

interface Movie {
  date: LocalizedString;
  title: string;
  director: string;
  year: string;
  image: string;
}

interface ContentStructure {
  header: {
    schedule: LocalizedString;
  };
  hero: {
    title: LocalizedString;
    subtitle: LocalizedString;
    date: LocalizedString;
    description: LocalizedString;
    ctaPrimary: LocalizedString;
    ctaSecondary: LocalizedString;
  };
  about: {
    title: LocalizedString;
    paragraphs: Paragraph[];
  };
  exhibitions: {
    title: LocalizedString;
    intro: LocalizedString;
    schedule: Exhibitor[];
  };
  cinema: {
    title: LocalizedString;
    curator: LocalizedString;
    intro: LocalizedString;
    dates: LocalizedString;
    schedule: Movie[];
  };
  venue: {
    title: LocalizedString;
    description: LocalizedString;
    address: LocalizedString;
  };
  sponsors: {
    main: LocalizedString;
    partners: LocalizedString;
  };
  organization: {
    organizedBy: LocalizedString;
  };
  footer: {
    programme: LocalizedString;
    cinema: LocalizedString;
    location: LocalizedString;
    contact: LocalizedString;
    copyright: LocalizedString;
  };
  chat: {
    initialMessage: LocalizedString;
    placeholder: LocalizedString;
  }
}

export const CONTENT: ContentStructure = {
  header: {
    schedule: {
      [Language.PT]: "Agenda a tua visita",
      [Language.EN]: "Schedule your visit",
    },
  },
  hero: {
    title: {
      [Language.PT]: "Comporta Design 2026",
      [Language.EN]: "Comporta Design 2026",
    },
    subtitle: {
      [Language.PT]: "Onde a autenticidade encontra o futuro.",
      [Language.EN]: "Where authenticity meets the future.",
    },
    date: {
      [Language.PT]: "Abril — Maio 2026 · Casa da Cultura da Comporta",
      [Language.EN]: "April — May 2026 · Casa da Cultura da Comporta",
    },
    description: {
        [Language.PT]: "Uma celebração do design, cultura e inovação no coração da Comporta.",
        [Language.EN]: "A celebration of design, culture, and innovation in the heart of Comporta."
    },
    ctaPrimary: {
      [Language.PT]: "Agenda a tua visita",
      [Language.EN]: "Schedule your visit",
    },
    ctaSecondary: {
      [Language.PT]: "Ver Programa",
      [Language.EN]: "View Programme",
    },
  },
  about: {
    title: {
      [Language.PT]: "Sobre o Evento",
      [Language.EN]: "About the Event",
    },
    paragraphs: [
      {
        [Language.PT]: "O Comporta Design 2026 nasce com a mesma energia que sempre existiu aqui: simplicidade, verdade e um respeito absoluto pela natureza e pelo ritmo próprio da Comporta. Inspirado pela Lisbon Design Week, mas com carácter totalmente nosso, o evento ocupa a Casa da Cultura da Comporta entre abril e maio de 2026, transformando o espaço num ponto de encontro entre design, arquitetura, cultura e comunidade.",
        [Language.EN]: "Comporta Design 2026 is born from the same energy that has always existed here: simplicity, truth, and an absolute respect for nature and Comporta's unique rhythm. Inspired by Lisbon Design Week, but with a character that is entirely our own, the event takes over Casa da Cultura da Comporta between April and May 2026, transforming the space into a meeting point for design, architecture, culture, and community.",
      },
      {
        [Language.PT]: "Durante dois meses, recebemos designers, arquitetos e criadores que vão apresentar o seu trabalho num ciclo contínuo de exposições — cada um com a sua linguagem, cada um a trazer algo novo ao território.",
        [Language.EN]: "For two months, we will host designers, architects, and creators who will present their work in a continuous cycle of exhibitions—each with their own language, each bringing something new to the territory.",
      },
      {
        [Language.PT]: "Teremos também um programa de Cinema de Autor, sempre às sextas e sábados, com curadoria de Francisco Ferreira, porque a cultura não vive só de objetos — vive de histórias.",
        [Language.EN]: "We will also have an Author Cinema program, always on Fridays and Saturdays, curated by Francisco Ferreira, because culture doesn't just live on objects—it lives on stories.",
      },
      {
        type: 'complex',
        content: {
          [Language.PT]: [
            "E porque nada disto se faz sozinho, juntam-se a nós marcas e parceiros que acreditam nesta visão e neste território: ",
            { text: "Fundação Herdade da Comporta", url: "https://www.fundacaohdc.pt/" },
            ", ",
            { text: "Tróia Design Hotel", url: "https://www.troiadesignhotel.com/pt/" },
            ", ",
            { text: "Polestar", url: "https://www.polestar.com/pt/" },
            ", ",
            { text: "Dils", url: "https://dils.pt/" },
            ", ",
            { text: "Huître", url: "https://huitre.pt/" },
            ", ",
            { text: "Home-tec", url: "https://home-tec.pt/?lang=en" },
            ", ",
            { text: "TUU", url: "https://tuu.pt/" },
            ", ",
            { text: "CÊ Studio Comporta", url: "https://cestudio.pt/" },
            " — todos alinhados em criar algo que respeita o lugar e projeta o futuro.",
          ],
          [Language.EN]: [
            "And because none of this is done alone, we are joined by brands and partners who believe in this vision and this territory: ",
            { text: "Fundação Herdade da Comporta", url: "https://www.fundacaohdc.pt/" },
            ", ",
            { text: "Tróia Design Hotel", url: "https://www.troiadesignhotel.com/pt/" },
            ", ",
            { text: "Polestar", url: "https://www.polestar.com/pt/" },
            ", ",
            { text: "Dils", url: "https://dils.pt/" },
            ", ",
            { text: "Huître", url: "https://huitre.pt/" },
            ", ",
            { text: "Home-tec", url: "https://home-tec.pt/?lang=en" },
            ", ",
            { text: "TUU", url: "https://tuu.pt/" },
            ", ",
            { text: "CÊ Studio Comporta", url: "https://cestudio.pt/" },
            "—all aligned in creating something that respects the place and projects the future.",
          ],
        }
      },
      {
        [Language.PT]: "O Comporta Design não é só um evento. É uma celebração do que somos capazes de construir quando juntamos talento, sensibilidade e a paisagem mais única de Portugal.",
        [Language.EN]: "Comporta Design is not just an event. It is a celebration of what we are capable of building when we bring together talent, sensitivity, and the most unique landscape in Portugal.",
      }
    ]
  },
  exhibitions: {
    title: {
      [Language.PT]: "Exposições — Ciclo Contínuo",
      [Language.EN]: "Exhibitions — Continuous Cycle",
    },
    intro: {
      [Language.PT]: "Apresentando uma seleção de obras de designers estabelecidos e emergentes que desafiam os limites da forma, função e materialidade.",
      [Language.EN]: "Featuring a curated selection of works from established and emerging designers who push the boundaries of form, function, and materiality.",
    },
    schedule: [
      {
        date: { [Language.PT]: '1-8 Abril', [Language.EN]: '1-8 April' },
        name: 'thilburg',
      },
      {
        date: { [Language.PT]: '9-16 Abril', [Language.EN]: '9-16 April' },
        name: 'ASSOCIAÇÃO PASSAR AO FUTURO',
      },
      {
        date: { [Language.PT]: '17-30 Abril', [Language.EN]: '17-30 April' },
        name: 'POOLINS',
      },
      {
        date: { [Language.PT]: '1-8 Maio', [Language.EN]: '1-8 May' },
        name: 'POOLINS\nARQUITETO\nMANUEL AIRES MATEUS',
      },
      {
        date: { [Language.PT]: '9-16 Maio', [Language.EN]: '9-16 May' },
        name: 'MOR DESIGN',
      },
      {
        date: { [Language.PT]: '17-31 Maio', [Language.EN]: '17-31 May' },
        name: 'WEWOOD',
        description: { [Language.PT]: 'PORTUGUESE JOINERY', [Language.EN]: 'PORTUGUESE JOINERY' },
      }
    ],
  },
  cinema: {
    title: {
      [Language.PT]: "Cinema de Autor",
      [Language.EN]: "Author Cinema",
    },
    curator: {
        [Language.PT]: "Curadoria de Francisco Ferreira",
        [Language.EN]: "Curated by Francisco Ferreira",
    },
    intro: {
      [Language.PT]: "Uma exploração cinematográfica do design, arquitetura e processos criativos, apresentando filmes raros e documentários instigantes.",
      [Language.EN]: "A cinematic exploration of design, architecture, and creative processes, featuring rare films and thought-provoking documentaries.",
    },
    dates: {
      [Language.PT]: "Sessões às sextas e sábados de Abril e Maio.",
      [Language.EN]: "Sessions on Fridays and Saturdays in April and May.",
    },
    schedule: [
      { date: { [Language.PT]: '10 ABR', [Language.EN]: 'APR 10' }, title: 'Amélie', director: 'Jean-Pierre Jeunet', year: '2001', image: 'https://upload.wikimedia.org/wikipedia/en/5/53/Amelie_poster.jpg' },
      { date: { [Language.PT]: '11 ABR', [Language.EN]: 'APR 11' }, title: 'Parasite', director: 'Bong Joon-ho', year: '2019', image: 'https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png' },
      { date: { [Language.PT]: '17 ABR', [Language.EN]: 'APR 17' }, title: 'The Handmaiden', director: 'Park Chan-wook', year: '2016', image: 'https://m.media-amazon.com/images/M/MV5BODYxY2Q0NDAtMWU2ZS00MjFmLWI2YzYtYTA4MWI3YmNiYzkzXkEyXkFqcGc%40._V1_FMjpg_UX1000_.jpg' },
      { date: { [Language.PT]: '18 ABR', [Language.EN]: 'APR 18' }, title: 'In the Mood for Love', director: 'Wong Kar-wai', year: '2000', image: 'https://tse1.mm.bing.net/th/id/OIP.bPKubXm8c77D-jq1elEUfgHaLb?pid=Api' },
      { date: { [Language.PT]: '24 ABR', [Language.EN]: 'APR 24' }, title: 'The Grand Budapest Hotel', director: 'Wes Anderson', year: '2014', image: 'https://i.ebayimg.com/images/g/ZYkAAOSwbiFZW6oA/s-l1200.jpg' },
      { date: { [Language.PT]: '25 ABR', [Language.EN]: 'APR 25' }, title: 'Spirited Away', director: 'Hayao Miyazaki', year: '2001', image: 'https://www.iceposter.com/thumbs/MOV_1ff5f62f_b.jpg' },
      { date: { [Language.PT]: '1 MAI', [Language.EN]: 'MAY 01' }, title: 'The Price of Desire', director: 'Mary McGuckian', year: '2015', image: 'https://upload.wikimedia.org/wikipedia/en/2/26/The_Price_of_Desire_poster.jpg' },
      { date: { [Language.PT]: '2 MAI', [Language.EN]: 'MAY 02' }, title: 'Moriyama-San', director: 'Ila Bêka & Louise Lemoine', year: '2017', image: 'https://pics.filmaffinity.com/moriyama_san-497764354-large.jpg' },
      { date: { [Language.PT]: '8 MAI', [Language.EN]: 'MAY 08' }, title: 'Rams', director: 'Grímur Hákonarson', year: '2015', image: 'https://m.media-amazon.com/images/M/MV5BMTY1NTI2NzUzNV5BMl5BanBnXkFtZTgwNDc5NDA2MDE%40._V1_.jpg' },
      { date: { [Language.PT]: '9 MAI', [Language.EN]: 'MAY 09' }, title: 'Visual Acoustics', director: 'Eric Bricker', year: '2008', image: 'https://images.squarespace-cdn.com/content/v1/58d052c93e00bef537b4d9e1/1567110966069-YTWKHZ5ZPWA9Y5D4PVXE/VisualAcousticsPoster_LoRez.jpg' },
      { date: { [Language.PT]: '15 MAI', [Language.EN]: 'MAY 15' }, title: 'The Fountainhead', director: 'King Vidor', year: '1949', image: 'https://picsum.photos/seed/fountainhead/800/1200' },
      { date: { [Language.PT]: '16 MAI', [Language.EN]: 'MAY 16' }, title: 'Brazil', director: 'Terry Gilliam', year: '1985', image: 'https://picsum.photos/seed/brazil/800/1200' },
      { date: { [Language.PT]: '22 MAI', [Language.EN]: 'MAY 22' }, title: 'Her', director: 'Spike Jonze', year: '2013', image: 'https://picsum.photos/seed/her/800/1200' },
      { date: { [Language.PT]: '23 MAI', [Language.EN]: 'MAY 23' }, title: 'The Belly of an Architect', director: 'Peter Greenaway', year: '1987', image: 'https://picsum.photos/seed/bellyarchitect/800/1200' },
      { date: { [Language.PT]: '29 MAI', [Language.EN]: 'MAY 29' }, title: 'Antonio Gaudí', director: 'Hiroshi Teshigahara', year: '1984', image: 'https://picsum.photos/seed/gaudi/800/1200' },
      { date: { [Language.PT]: '30 MAI', [Language.EN]: 'MAY 30' }, title: 'Unfinished Spaces', director: 'Alysa Nahmias', year: '2011', image: 'https://picsum.photos/seed/unfinished/800/1200' },
    ]
  },
  venue: {
    title: {
      [Language.PT]: "Casa da Cultura — O Local",
      [Language.EN]: "Casa da Cultura — The Venue",
    },
    description: {
      [Language.PT]: "A Casa da Cultura da Comporta serve como o centro nevrálgico do nosso evento. Um espaço histórico que combina o charme rústico com a estética moderna, proporcionando o cenário perfeito para a nossa celebração do design.",
      [Language.EN]: "The Casa da Cultura da Comporta serves as the nerve center for our event. A historic space that blends rustic charm with modern aesthetics, providing the perfect backdrop for our celebration of design.",
    },
    address: {
      [Language.PT]: "Largo de São João, 7580-612 Comporta, Portugal",
      [Language.EN]: "Largo de São João, 7580-612 Comporta, Portugal",
    },
  },
  sponsors: {
    main: {
      [Language.PT]: "Patrocinadores Principais",
      [Language.EN]: "Main Sponsors",
    },
    partners: {
      [Language.PT]: "Parceiros & Apoios",
      [Language.EN]: "Partners & Supporters",
    },
  },
  organization: {
    organizedBy: {
      [Language.PT]: "Evento organizado por",
      [Language.EN]: "Event organized by",
    },
  },
  footer: {
    programme: {
      [Language.PT]: "Programa",
      [Language.EN]: "Programme",
    },
    cinema: {
      [Language.PT]: "Cinema de Autor",
      [Language.EN]: "Author Cinema",
    },
    location: {
      [Language.PT]: "Local",
      [Language.EN]: "Location",
    },
    contact: {
      [Language.PT]: "Contacto",
      [Language.EN]: "Contact",
    },
    copyright: {
        [Language.PT]: "© 2024 Comporta Design. Todos os direitos reservados.",
        [Language.EN]: "© 2024 Comporta Design. All rights reserved."
    }
  },
  chat: {
    initialMessage: {
      [Language.PT]: "Olá! Sou o assistente virtual do Comporta Design 2026. Como posso ajudar?",
      [Language.EN]: "Hello! I'm the virtual assistant for Comporta Design 2026. How can I help you?",
    },
    placeholder: {
        [Language.PT]: "Escreva a sua pergunta...",
        [Language.EN]: "Type your question...",
    }
  }
};