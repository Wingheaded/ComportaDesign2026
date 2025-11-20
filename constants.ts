

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
export type Paragraph = LocalizedString | ComplexParagraph;

export interface ExhibitorDetails {
  description: Paragraph[];
  images: {
    url: string;
    caption?: string;
  }[];
  links: {
    website?: string;
    instagram?: string;
    catalogUrl?: string;
    email?: string;
  };
}

export interface Exhibitor {
  date: LocalizedString;
  name: string;
  logo?: string;
  description?: LocalizedString;
  details?: ExhibitorDetails;
}

interface Movie {
  date: LocalizedString;
  title: string;
  director: string;
  year: string;
  image: string;
  summary: LocalizedString;
}

interface ContentStructure {
  header: {
    schedule: LocalizedString;
  };
  navigation: {
    home: LocalizedString;
    about: LocalizedString;
    programme: LocalizedString;
    cinema: LocalizedString;
    location: LocalizedString;
    contact: LocalizedString;
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
    modal: {
      close: LocalizedString;
      visitWebsite: LocalizedString;
      downloadCatalog: LocalizedString;
    }
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
  contactSection: {
    title: LocalizedString;
    nameLabel: LocalizedString;
    emailLabel: LocalizedString;
    messageLabel: LocalizedString;
    submitButton: LocalizedString;
    successMessage: LocalizedString;
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
  navigation: {
    home: {
      [Language.PT]: "Início",
      [Language.EN]: "Home",
    },
    about: {
      [Language.PT]: "Sobre",
      [Language.EN]: "About",
    },
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
      [Language.PT]: "Uma programação dinâmica que traz o melhor do design nacional e internacional.",
      [Language.EN]: "A dynamic program bringing the best of national and international design.",
    },
    schedule: [
      {
        date: {
          [Language.PT]: "1-8 Abril",
          [Language.EN]: "April 1-8",
        },
        name: "THILBURG",
        logo: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/logos/thilburg_logo.jpg",
        description: {
          [Language.PT]: "Home ware feito à mão em Portugal",
          [Language.EN]: "Handmade homeware from Portugal",
        },
        details: {
            description: [
                {
                    [Language.PT]: "Thilburg | Home ware feito à mão em Portugal",
                    [Language.EN]: "Thilburg | Handmade homeware from Portugal"
                },
                {
                    [Language.PT]: "Thilburg é uma marca original de acessórios para casa, fundada em Portugal em 2024 pelo designer Klaas Van Tilburgh. Apresentando uma coleção meticulosamente selecionada, Thilburg propõe uma fusão única entre luxo discreto e design minimalista. Cada peça é pensada para valorizar a essência da elegância discreta, combinando qualidade, simplicidade e tradição artesanal portuguesa.",
                    [Language.EN]: "Thilburg is an original home accessories brand, founded in Portugal in 2024 by designer Klaas Van Tilburgh. Presenting a meticulously selected collection, Thilburg proposes a unique fusion between discreet luxury and minimalist design. Each piece is designed to value the essence of discreet elegance, combining quality, simplicity, and Portuguese artisanal tradition."
                },
                {
                    [Language.PT]: "Nossa primeira coleção, “More or Less”, foi lançada durante a Lisbon Design Week 2025, trazendo objetos decorativos atemporais e reinventados, feitos para espaços onde a sofisticação se expressa em elementos de forma e matéria.",
                    [Language.EN]: "Our first collection, “More or Less”, was launched during Lisbon Design Week 2025, bringing timeless and reinvented decorative objects, made for spaces where sophistication expresses itself in elements of form and matter."
                }
            ],
            images: [
                {
                    url: "https://static.wixstatic.com/media/981362_6c5471d4d6f745188abaefb460979d46~mv2.jpg/v1/crop/x_0,y_404,w_1036,h_1421/fill/w_298,h_403,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/e1b79f6f-77a9-4493-9331-d851f3538add%202_e.jpg",
                },
                {
                    url: "https://static.wixstatic.com/media/981362_4cf8271da92c434881cbce237f29468e~mv2.jpg/v1/crop/x_0,y_1004,w_4016,h_5006/fill/w_298,h_358,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/981362_4cf8271da92c434881cbce237f29468e~mv2.jpg",
                }
            ],
            links: {
                website: "https://www.thilburg.com/",
                catalogUrl: "https://www.thilburg.com/pt/_files/ugd/981362_a20df2eb652045039388fb4edaa499ad.pdf",
            }
        }
      },
      {
        date: {
          [Language.PT]: "9-16 Abril",
          [Language.EN]: "April 9-16",
        },
        name: "ASSO. PASSA AO FUTURO",
        logo: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/logos/passa-ao-futuro-logo.jpg",
        description: {
          [Language.PT]: "Património Artesanal Português",
          [Language.EN]: "Portuguese Artisanal Heritage",
        },
        details: {
          description: [
            {
              [Language.PT]: "Passa Ao Futuro | Património Artesanal Português",
              [Language.EN]: "Passa Ao Futuro | Portuguese Artisanal Heritage"
            },
            {
              [Language.PT]: "A Passa Ao Futuro é uma organização cultural sem fins lucrativos dedicada à preservação, ativação e celebração do artesanato tradicional português. Fundada para dar continuidade ao saber-fazer dos artesãos nacionais, a iniciativa documenta técnicas ancestrais, promove residências e projetos colaborativos entre artesãos, designers e arquitetos, e desenvolve programas educativos que visam formar novas gerações e estimular a inovação responsável.",
              [Language.EN]: "Passa Ao Futuro is a non-profit cultural organization dedicated to the preservation, activation, and celebration of traditional Portuguese craftsmanship. Founded to sustain the know-how of national artisans, the initiative documents ancestral techniques, promotes residencies and collaborative projects between artisans, designers, and architects, and develops educational programs aimed at training new generations and stimulating responsible innovation."
            },
            {
              [Language.PT]: "Com uma abordagem que valoriza a sustentabilidade ambiental, social e económica, Passa Ao Futuro integra princípios criativos e colaborativos, conectando tradição à contemporaneidade para gerar impacto positivo e sistemas de futuro.",
              [Language.EN]: "With an approach that values environmental, social, and economic sustainability, Passa Ao Futuro integrates creative and collaborative principles, connecting tradition to contemporaneity to generate positive impact and future systems."
            },
            {
              [Language.PT]: "A missão é criar pontes entre o conhecimento tradicional e o design moderno, promovendo peças e experiências que elevam a herança artesanal portuguesa, adaptando-a aos novos tempos e necessidades. A filosofia da organização baseia-se na colaboração, respeito pela identidade local e na procura constante pela excelência, simplicidade e autenticidade.",
              [Language.EN]: "The mission is to build bridges between traditional knowledge and modern design, promoting pieces and experiences that elevate Portuguese artisanal heritage, adapting it to new times and needs. The organization's philosophy is based on collaboration, respect for local identity, and the constant search for excellence, simplicity, and authenticity."
            }
          ],
          images: [
            {
              url: "https://images.squarespace-cdn.com/content/v1/5968bdd6b3db2b15fd5dfb4d/7cf8dfde-fdc0-486e-8f92-0ec1c555cb77/PT_Residency+01_Junco_Sam+%26+ToinoAbel_Product+Photos_Passa+Ao+Futuro+%C2%A9+Nuno+Henriques_02.jpg?format=750w"
            },
            {
              url: "https://images.squarespace-cdn.com/content/v1/5968bdd6b3db2b15fd5dfb4d/1727882973922-ZRG9A3GA7AJ5ZW3X40Z9/PT_Residency03_Palm_Product_Joana%26Sonia-7.jpg?format=500w"
            }
          ],
          links: {
            website: "https://www.passaaofuturo.com/",
            catalogUrl: "https://www.passaaofuturo.com/products-catalogue-catlogo"
          }
        }
      },
      {
        date: {
          [Language.PT]: "17-30 Abril",
          [Language.EN]: "April 17-30",
        },
        name: "POOLINS",
        logo: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/logos/poolins-logo.jpg",
        description: {
          [Language.PT]: "Piscinas Ecológicas e Exterior",
          [Language.EN]: "Eco-friendly Pools & Outdoor",
        },
        details: {
          description: [
            {
              [Language.PT]: "Poolins | Cultura da Água e Design de Exterior",
              [Language.EN]: "Poolins | Water Culture & Outdoor Design"
            },
            {
              [Language.PT]: "A Poolins é uma marca espanhola inovadora e premiada que está a redefinir a indústria das piscinas com as suas piscinas ecológicas, de montagem rápida e personalizáveis, e produtos de exterior. Cada projeto Poolins personifica a Cultura da Água — responsabilidade para com a natureza aliada ao design moderno.",
              [Language.EN]: "Poolins is an innovative, award-winning Spanish brand redefining the pool industry with its eco-friendly, fast-assembly, customizable pools and outdoor products. Every Poolins project embodies Water Culture—responsibility to nature blended with modern design."
            },
            {
              [Language.PT]: "A Poolins destaca-se pela eficiência, sustentabilidade, apelo estético e envolvimento comunitário, tornando-se o parceiro ideal para clientes que procuram soluções de exterior inteligentes e responsáveis.",
              [Language.EN]: "Poolins stands out in efficiency, sustainability, aesthetic appeal, and community engagement, making it an ideal partner for clients seeking smart, responsible outdoor solutions."
            }
          ],
          images: [
            {
              url: "https://poolins.com/wp-content/uploads/2025/02/poolins-jets-foto-1024x768.jpg"
            },
            {
              url: "https://poolins.com/wp-content/uploads/2025/04/desbordante3-1024x768.jpg"
            }
          ],
          links: {
            website: "https://poolins.com/en/poolins-en/",
            catalogUrl: "https://poolins.com/en/downloads/"
          }
        }
      },
      {
        date: {
          [Language.PT]: "1-8 Maio",
          [Language.EN]: "May 1-8",
        },
        name: "VONDOM",
        description: {
          [Language.PT]: "Mobiliário de Exterior",
          [Language.EN]: "Outdoor Furniture",
        },
        details: {
          description: [
            {
              [Language.PT]: "Vondom | Design de Mobiliário de Exterior",
              [Language.EN]: "Vondom | Outdoor Furniture Design"
            },
            {
              [Language.PT]: "A Vondom é uma marca espanhola de renome especializada em mobiliário de exterior inovador e de design único, vasos e acessórios decorativos. Estabelecida em 2008, a Vondom destaca-se pelo seu compromisso com a estética moderna, durabilidade e sustentabilidade, incorporando materiais naturais e 100% recicláveis nas suas coleções.",
              [Language.EN]: "Vondom is a renowned Spanish brand specializing in innovative and uniquely designed outdoor furniture, planters, and decorative accessories. Established in 2008, Vondom stands out for its commitment to modern aesthetics, durability, and sustainability, incorporating natural and 100% recyclable materials in its collections."
            },
            {
              [Language.PT]: "Os seus produtos — que vão desde espreguiçadeiras elegantes a sofás modulares — são criados tanto para espaços residenciais como para projetos de contrato, incluindo hotéis e restaurantes. A Vondom colabora com designers de topo para criar coleções que transformam ambientes exteriores em espaços de vida inspiradores e confortáveis.",
              [Language.EN]: "Their products—ranging from elegant loungers to modular sofas—are crafted for both residential and contract spaces, including hotels and restaurants. Vondom collaborates with leading designers to create collections that transform exterior environments into inspiring and comfortable living spaces."
            }
          ],
          images: [
            { url: "https://cdn.vondom.com/wp-content/smush-webp/2025/02/Vondom-Pasadena-Jean-Marie-Massaud-1.jpg.webp" },
            { url: "https://cdn.vondom.com/wp-content/smush-webp/2023/04/Vondom-Milos-Jean-Marie-Massaud-1920x1280_0001_225_29_corner-entrance_PM_final_Upd.jpg.webp" }
          ],
          links: {
            website: "https://www.vondom.com/",
            catalogUrl: "https://www.vondom.com/products/"
          }
        }
      },
      {
        date: {
          [Language.PT]: "9-16 Maio",
          [Language.EN]: "May 9-16",
        },
        name: "MORDESIGN",
        logo: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/logos/mordesign-logo.jpg",
        description: {
          [Language.PT]: "Design Sustentável",
          [Language.EN]: "Sustainable Design",
        },
        details: {
          description: [
            {
              [Language.PT]: "MOR Design | Menos do mesmo, mais design",
              [Language.EN]: "MOR Design | Less of the same, more design"
            },
            {
              [Language.PT]: "A MOR Design personifica o artesanato português reinterpretado para um público global, defendendo o minimalismo, materiais superiores, qualidade em pequena escala e objetos concebidos para durar gerações.",
              [Language.EN]: "MOR Design epitomizes Portuguese craftsmanship reinterpreted for a global audience, standing for minimalism, superior materials, small-scale quality, and objects designed to last for generations."
            },
            {
              [Language.PT]: "A marca é uma referência de como os métodos tradicionais e o talento internacional se unem na arte funcional, proporcionando conjuntos distintos e harmoniosos tanto para casas como para projetos.",
              [Language.EN]: "The brand is a benchmark for how traditional methods and international talent come together in functional art, providing distinctive and harmonious sets for both homes and projects."
            },
            {
              [Language.PT]: "Se procura design que importa e permanece relevante, a MOR representa “menos do mesmo, mais design” — um convite para abraçar o essencial, agora e sempre.",
              [Language.EN]: "If you seek design that matters and stays relevant, MOR represents “less of the same, more design”—an invitation to embrace the essential, now and always."
            }
          ],
          images: [
            { url: "https://mordesign.com/cdn/shop/files/BULB_2.jpg?v=1757694027&width=500" },
            { url: "https://mordesign.com/cdn/shop/files/DSCF0134_arranjada_4x32000_ae8b2730-543c-4e6a-b10f-737d4ff28a63.jpg?v=1761307939&width=300" }
          ],
          links: {
            website: "https://mordesign.com/",
            catalogUrl: "https://mordesign.com/collections/set-pieces-good-deals-solution"
          }
        }
      },
      {
        date: {
          [Language.PT]: "17-31 Maio",
          [Language.EN]: "May 17-31",
        },
        name: "WEWOOD",
        logo: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/logos/wewood-logo.jpg",
        description: {
          [Language.PT]: "Marcenaria Portuguesa",
          [Language.EN]: "Portuguese Joinery",
        },
        details: {
          description: [
            {
              [Language.PT]: "Wewood | Mobiliário de excelência e tradição portuguesa",
              [Language.EN]: "Wewood | Excellence in Furniture and Portuguese Tradition"
            },
            {
              [Language.PT]: "Wewood é uma marca de destaque no universo do mobiliário, fundada em Portugal e reconhecida internacionalmente pela sua dedicação ao design exclusivo, à tradição artesanal e à produção sustentável. Especializada na criação, manufatura e exportação de peças de mobiliário em madeira maciça, a Wewood une estética duradoura e funcionalidade, celebrando o saber-fazer português e o rigor artesanal em cada detalhe.",
              [Language.EN]: "Wewood is a prominent brand in the furniture universe, founded in Portugal and internationally recognized for its dedication to exclusive design, artisanal tradition, and sustainable production. Specialized in the creation, manufacture, and export of solid wood furniture pieces, Wewood combines lasting aesthetics and functionality, celebrating Portuguese know-how and artisanal rigor in every detail."
            },
            {
              [Language.PT]: "Inspirada pelo legado da carpintaria portuguesa, a Wewood valoriza a colaboração entre artesãos experientes e designers prestigiados, resultando em coleções que equilibram inovação e tradição. Os móveis são criados para perdurar, destacando formas intemporais, materiais nobres e acabamentos primorosos — concebidos em séries limitadas para garantir exclusividade e autenticidade.",
              [Language.EN]: "Inspired by the legacy of Portuguese carpentry, Wewood values the collaboration between experienced artisans and prestigious designers, resulting in collections that balance innovation and tradition. The furniture is created to last, highlighting timeless forms, noble materials, and exquisite finishes—conceived in limited series to ensure exclusivity and authenticity."
            },
            {
              [Language.PT]: "A filosofia da marca é pautada pela sustentabilidade, responsabilidade social e compromisso com a qualidade. Todas as peças são pensadas para ambientes onde o requinte e a utilidade convivem em harmonia, tornando-se elementos centrais de projetos residenciais e hoteleiros em diversos países.",
              [Language.EN]: "The brand's philosophy is guided by sustainability, social responsibility, and a commitment to quality. All pieces are designed for environments where refinement and utility coexist in harmony, becoming central elements of residential and hospitality projects in various countries."
            }
          ],
          images: [
            { url: "https://images.squarespace-cdn.com/content/v1/5411b34ee4b0aa818cc870ab/2955be31-ee48-4436-84a6-84585329d0ab/Wewood%2BPARIS.png?format=500w" },
            { url: "https://images.squarespace-cdn.com/content/v1/5411b34ee4b0aa818cc870ab/2100d879-a506-484a-aa2d-74b52db02d11/metis_wewood.jpg?format=500w" }
          ],
          links: {
            website: "https://www.wewood.eu/",
            catalogUrl: "https://www.wewood.eu/catalogue-request"
          }
        }
      },
    ],
    modal: {
      close: {
        [Language.PT]: "Fechar",
        [Language.EN]: "Close",
      },
      visitWebsite: {
        [Language.PT]: "Visitar Website",
        [Language.EN]: "Visit Website",
      },
      downloadCatalog: {
        [Language.PT]: "Catálogo",
        [Language.EN]: "Catalog",
      }
    }
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
      [Language.PT]: "Sextas e Sábados às 21:30. Entrada livre.",
      [Language.EN]: "Fridays and Saturdays at 9:30 PM. Free entry.",
    },
    dates: {
      [Language.PT]: "Abril — Maio 2026",
      [Language.EN]: "April — May 2026",
    },
    schedule: [
        {
            date: { [Language.PT]: "10 Abril", [Language.EN]: "April 10" },
            title: "The Fountainhead",
            director: "King Vidor",
            year: "1949",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/TheFontainHead.jpg",
            summary: {
              [Language.PT]: "Um arquiteto intransigente luta contra as restrições sociais. A arquitetura e o design são fundamentais, simbolizando a independência criativa e ideais filosóficos sobre forma, função e integridade artística.",
              [Language.EN]: "An uncompromising architect battles societal constraints. Architecture and design are integral, symbolizing creative independence and philosophical ideals about form, function, and artistic integrity."
            }
        },
        {
            date: { [Language.PT]: "11 Abril", [Language.EN]: "April 11" },
            title: "Columbus",
            director: "Kogonada",
            year: "2017",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/Columbus.jpg",
            summary: {
              [Language.PT]: "A arquitetura modernista molda conexões pessoais em Columbus, Indiana. O filme explora comovente como o design influencia a emoção, a reflexão e a comunidade, com edifícios como testemunhas silenciosas das experiências humanas.",
              [Language.EN]: "Modernist architecture shapes personal connections in Columbus, Indiana. The film explores how design influences emotion, reflection, and community, with buildings as silent witnesses to human experiences."
            }
        },
        {
            date: { [Language.PT]: "17 Abril", [Language.EN]: "April 17" },
            title: "Architecture 101",
            director: "Lee Yong-ju",
            year: "2012",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/Architect101.jpg",
            summary: {
              [Language.PT]: "O primeiro amor e as memórias entrelaçam-se com a construção de uma casa e a revisitação de espaços arquitetónicos do passado. Explora como a arquitetura molda histórias de vida e o crescimento pessoal.",
              [Language.EN]: "First love and memories are intertwined with home building and revisiting architectural spaces from the past. Explores how architecture shapes life stories and personal growth."
            }
        },
        {
            date: { [Language.PT]: "18 Abril", [Language.EN]: "April 18" },
            title: "Sidewalls",
            director: "Gustavo Taretto",
            year: "2011",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/Sidewalls.jpg",
            summary: {
              [Language.PT]: "O tecido urbano de Buenos Aires — edifícios, vazios e \"paredes meias\" — reflete isolamento e conexão. A arquitetura é palco e metáfora, mostrando como o design da cidade influencia os relacionamentos e a solidão.",
              [Language.EN]: "Buenos Aires’ urban fabric—buildings, voids, and “sidewalls”—reflects isolation and connection. Architecture is both stage and metaphor, showing how city design influences relationships and solitude."
            }
        },
        {
            date: { [Language.PT]: "24 Abril", [Language.EN]: "April 24" },
            title: "Dark City",
            director: "Alex Proyas",
            year: "1998",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/DarkCity.jpg",
            summary: {
              [Language.PT]: "Uma cidade pesadelo com arquitetura mutável torna-se ela própria uma personagem. O design urbano reflete estados psicológicos, transformando espaços à medida que o protagonista descobre a realidade e a identidade.",
              [Language.EN]: "A nightmarish city with shifting architecture becomes a character itself. Urban design reflects psychological states, transforming spaces as the protagonist uncovers reality and identity."
            }
        },
        {
            date: { [Language.PT]: "25 Abril", [Language.EN]: "April 25" },
            title: "High-Rise",
            director: "Ben Wheatley",
            year: "2015",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/HighRise.jpg",
            summary: {
              [Language.PT]: "A arquitetura de uma torre residencial impulsiona o conflito de classes, o colapso da comunidade e o caos. O design do edifício é central, ampliando as dinâmicas sociais e os efeitos psicológicos da vida urbana vertical.",
              [Language.EN]: "A residential tower’s architecture drives class conflict, community breakdown, and chaos. Building design is central, magnifying social dynamics and the psychological effects of vertical urban living."
            }
        },
        {
            date: { [Language.PT]: "1 Maio", [Language.EN]: "May 1" },
            title: "The Brutalist",
            director: "Brady Corbet",
            year: "2024",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/TheBrutalist.jpg",
            summary: {
              [Language.PT]: "A arquitetura brutalista do pós-guerra e a vida de um arquiteto estão profundamente ligadas. Foca-se em como o design, o trauma e a identidade pessoal se manifestam em formas austeras e monumentais.",
              [Language.EN]: "Postwar brutalist architecture and an architect's life are deeply connected. Focuses on how design, trauma, and personal identity are manifested in stark, monumental forms."
            }
        },
        {
            date: { [Language.PT]: "2 Maio", [Language.EN]: "May 2" },
            title: "The Man Next Door",
            director: "Mariano Cohn, Gastón Duprat",
            year: "2010",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/TheManNextDoor.jpg",
            summary: {
              [Language.PT]: "As tensões na vizinhança aumentam devido a elementos arquitetónicos — paredes e espaços abertos — mostrando como o design da casa e as fronteiras urbanas mediam conflitos e relacionamentos na vida moderna.",
              [Language.EN]: "Neighbourhood tensions escalate due to architectural elements—walls and open spaces—showing how home design and urban boundaries mediate conflict and relationships in modern living."
            }
        },
        {
            date: { [Language.PT]: "8 Maio", [Language.EN]: "May 8" },
            title: "Playtime",
            director: "Jacques Tati",
            year: "1967",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/Playtime.jpg",
            summary: {
              [Language.PT]: "Numa cidade modernista, a arquitetura e o design moldam a forma como as pessoas interagem com os espaços urbanos. O filme explora com humor a alienação e a navegação em ambientes altamente projetados.",
              [Language.EN]: "In a modernist city, architecture and design shape how people interact with urban spaces. The film humorously explores the alienation and navigation of highly designed environments."
            }
        },
        {
            date: { [Language.PT]: "9 Maio", [Language.EN]: "May 9" },
            title: "Koyaanisqatsi",
            director: "Godfrey Reggio",
            year: "1982",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/Koyaaniisqatsi.jpg",
            summary: {
              [Language.PT]: "Documentário abstrato que mostra paisagens e ambientes urbanos. A arquitetura e o planeamento urbano ilustram o desequilíbrio entre a natureza e o design artificial, questionando o impacto da tecnologia na vida humana.",
              [Language.EN]: "Abstract documentary shows landscapes and urban environments. Architecture and city planning illustrate the imbalance between nature and artificial design, questioning technology’s impact on human life."
            }
        },
        {
            date: { [Language.PT]: "15 Maio", [Language.EN]: "May 15" },
            title: "Metropolis",
            director: "Fritz Lang",
            year: "1927",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/Metropolis.jpg",
            summary: {
              [Language.PT]: "A arquitetura de uma cidade futurista simboliza poder, divisão de classes e imaginação. O design personifica o espetáculo social e a mecanização, impactando o destino pessoal num mundo verticalmente estratificado.",
              [Language.EN]: "A futuristic city’s architecture symbolizes power, class division, and imagination. Design embodies societal spectacle and mechanization, impacting personal destiny in a vertically stratified world."
            }
        },
        {
            date: { [Language.PT]: "16 Maio", [Language.EN]: "May 16" },
            title: "The Towering Inferno",
            director: "John Guillermin",
            year: "1974",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/TheToweringInferno.jpg",
            summary: {
              [Language.PT]: "O desastre atinge um arranha-céus, sendo a arquitetura central para a sobrevivência e a narrativa. O design do edifício amplia o drama, tornando a estrutura protagonista na tragédia que se desenrola.",
              [Language.EN]: "Disaster strikes a skyscraper, with architecture central to survival and storytelling. Building design magnifies drama, making the structure itself a protagonist in the unfolding tragedy."
            }
        },
        {
            date: { [Language.PT]: "22 Maio", [Language.EN]: "May 22" },
            title: "Life as a House",
            director: "Irwin Winkler",
            year: "2001",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/LifeAsaHouse.jpg",
            summary: {
              [Language.PT]: "Construir uma casa representa transformação, cura e conexão. A arquitetura torna-se uma metáfora para a mudança pessoal, com jornadas emocionais entrelaçadas com o ato de projetar espaços.",
              [Language.EN]: "Building a home represents transformation, healing, and connection. Architecture becomes a metaphor for personal change, with emotional journeys intertwined with the act of designing spaces."
            }
        },
        {
            date: { [Language.PT]: "23 Maio", [Language.EN]: "May 23" },
            title: "The Architect",
            director: "Jonathan Parker",
            year: "2016",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/TheArchitect.jpg",
            summary: {
              [Language.PT]: "As escolhas de um arquiteto impactam várias vidas, examinando como o design influencia os relacionamentos pessoais e a comunidade. Destaca questões éticas na arquitetura, misturando o estudo de personagens com o ambiente construído.",
              [Language.EN]: "An architect’s choices impact multiple lives, examining how design influences personal relationships and community. Highlights ethical questions in architecture, blending character study with built environment."
            }
        },
        {
            date: { [Language.PT]: "29 Maio", [Language.EN]: "May 29" },
            title: "The Black Cat",
            director: "Edgar G. Ulmer",
            year: "1934",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/TheBlackCat.jpg",
            summary: {
              [Language.PT]: "Um conto de terror passado numa casa cuja arquitetura peculiar se torna central. O design do edifício cria desconforto psicológico, transformando espaços em agentes ativos de pavor.",
              [Language.EN]: "A horror tale set in a house whose peculiar architecture becomes central. The building’s design creates psychological unease, turning spaces into active agents of dread."
            }
        },
        {
            date: { [Language.PT]: "30 Maio", [Language.EN]: "May 30" },
            title: "Strangers When We Meet",
            director: "Richard Quine",
            year: "1960",
            image: "https://raw.githubusercontent.com/Wingheaded/ComportaDesign2026/main/public/movies/StrangersWhenWeMeet.jpg",
            summary: {
              [Language.PT]: "O projeto de um arquiteto entrelaça-se com a sua vida pessoal, com o design da casa a refletir a complexidade emocional. A arquitetura é cenário e símbolo para os relacionamentos intrincados da história.",
              [Language.EN]: "An architect’s project intertwines with his personal life, with house design reflecting emotional complexity. Architecture is both setting and symbol for the story’s intricate relationships."
            }
        }
    ]
  },
  venue: {
    title: {
      [Language.PT]: "Casa da Cultura da Comporta",
      [Language.EN]: "Casa da Cultura da Comporta",
    },
    description: {
      [Language.PT]: "Localizada no centro da vila, a Casa da Cultura é um espaço de encontro e criação. Com a sua arquitetura tradicional reabilitada, oferece o cenário perfeito para o diálogo entre o património local e o design contemporâneo.",
      [Language.EN]: "Located in the center of the village, Casa da Cultura is a space for meeting and creation. With its rehabilitated traditional architecture, it offers the perfect setting for the dialogue between local heritage and contemporary design.",
    },
    address: {
      [Language.PT]: "Rua do Secador, 7580-648 Comporta",
      [Language.EN]: "Rua do Secador, 7580-648 Comporta",
    },
  },
  sponsors: {
    main: {
      [Language.PT]: "Patrocinadores Principais",
      [Language.EN]: "Main Sponsors",
    },
    partners: {
      [Language.PT]: "Parceiros Institucionais",
      [Language.EN]: "Institutional Partners",
    },
  },
  contactSection: {
    title: {
      [Language.PT]: "Entra em contacto connosco",
      [Language.EN]: "Get in touch with us",
    },
    nameLabel: {
      [Language.PT]: "Nome",
      [Language.EN]: "Name",
    },
    emailLabel: {
      [Language.PT]: "Email",
      [Language.EN]: "Email",
    },
    messageLabel: {
      [Language.PT]: "Mensagem",
      [Language.EN]: "Message",
    },
    submitButton: {
      [Language.PT]: "Enviar Mensagem",
      [Language.EN]: "Send Message",
    },
    successMessage: {
      [Language.PT]: "Obrigado! A tua mensagem foi enviada com sucesso.",
      [Language.EN]: "Thank you! Your message has been sent successfully.",
    },
  },
  organization: {
    organizedBy: {
      [Language.PT]: "Organização",
      [Language.EN]: "Organized by",
    },
  },
  footer: {
    programme: {
      [Language.PT]: "Programa",
      [Language.EN]: "Programme",
    },
    cinema: {
      [Language.PT]: "Cinema",
      [Language.EN]: "Cinema",
    },
    location: {
      [Language.PT]: "Localização",
      [Language.EN]: "Location",
    },
    contact: {
      [Language.PT]: "Contacto",
      [Language.EN]: "Contact",
    },
    copyright: {
      [Language.PT]: "© 2024 Comporta Design. Todos os direitos reservados.",
      [Language.EN]: "© 2024 Comporta Design. All rights reserved.",
    },
  },
  chat: {
    initialMessage: {
      [Language.PT]: "Olá! Sou o assistente virtual do Comporta Design 2026. Como posso ajudar?",
      [Language.EN]: "Hello! I'm the virtual assistant for Comporta Design 2026. How can I help you?",
    },
    placeholder: {
      [Language.PT]: "Digite a sua mensagem...",
      [Language.EN]: "Type your message...",
    }
  }
};