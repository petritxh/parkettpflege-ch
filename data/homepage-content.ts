export interface FAQItem {
  question: string;
  answer: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface ServiceCard {
  title: string;
  text: string;
  benefit: string;
  href: string;
}

export interface ProblemCard {
  title: string;
  text: string;
  cta: string;
  href: string;
  icon?: string;
}

export interface CostCard {
  title: string;
  text: string;
  cta: string;
  href: string;
}

export interface StepItem {
  step: number;
  title: string;
  text: string;
}

export interface BenefitItem {
  title: string;
  text: string;
}

export interface CaseTeaser {
  id: number;
  title: string;
  problem: string;
  text: string;
  slug: string;
}

export const homepageContent = {
  meta: {
    title: "Parkettpflege Zürich | Reinigung, Reparatur & Renovation",
    description: "Parkettpflege in Zürich: Reinigung, Reparatur, Ölen, Schleifen und Versiegeln. Schaden per Foto einschätzen lassen oder Kosten direkt berechnen.",
    canonical: "https://parkett-pflege.ch/",
    openGraphTitle: "Parkettpflege in Zürich – Parkett erhalten. Werte bewahren.",
    openGraphDescription: "Professionelle Parkettpflege, Reparatur und Renovation im Raum Zürich – mit Fotoanalyse, Kostenrechner und Vorher-Nachher-Beispielen."
  },
  hero: {
    eyebrow: "Parkettpflege, Reparatur & Renovation im Raum Zürich",
    h1: "Parkettpflege in Zürich – Parkett erhalten. Werte bewahren.",
    subheadline: "Wir reinigen, reparieren, ölen, schleifen und schützen Parkettböden im Raum Zürich – mit Fotoanalyse, transparenter Einschätzung und sauberer Ausführung.",
    extendedText: "Nicht jeder Parkettboden muss sofort geschliffen werden. Oft reicht eine fachgerechte Reinigung, eine Nachölung oder eine lokale Reparatur. Wir prüfen zuerst, was Ihr Boden wirklich braucht – damit bestehendes Parkett erhalten bleibt und unnötiger Ersatz vermieden wird.",
    primaryCta: {
      label: "Foto hochladen & Einschätzung erhalten",
      href: "/tools/fotoanalyse-parkett"
    },
    secondaryCta: {
      label: "Kosten berechnen",
      href: "/tools/parkett-kostenrechner"
    },
    tertiaryLink: {
      label: "Problem auswählen",
      href: "#problem-auswahl"
    },
    trustChips: [
      "Fotoanalyse möglich",
      "Raum Zürich",
      "Reinigung, Reparatur & Renovation",
      "Parkett retten statt ersetzen",
      "Für Wohnungen, Häuser & Verwaltungen"
    ],
    microcopy: "Erste Orientierung anhand Ihrer Fotos – ideal bei Flecken, Kratzern, Laufstrassen oder Unsicherheit."
  },
  trustBar: {
    shortText: "Von der Pflege bis zur Renovation: Wir helfen Ihnen, die passende Behandlung für Ihren Parkettboden zu finden.",
    items: [
      "Spezialisiert auf Parkett",
      "Fotoanalyse für Schäden",
      "Transparente Einschätzung",
      "Raum Zürich",
      "Erhalten statt ersetzen"
    ]
  },
  problemSelector: {
    anchor: "problem-auswahl",
    h2: "Was braucht Ihr Parkett?",
    intro: "Kratzer, Flecken, Laufstrassen oder ein matter Boden bedeuten nicht automatisch, dass der ganze Boden abgeschliffen werden muss. Wählen Sie aus, was Sie an Ihrem Parkett beobachten – wir führen Sie zur passenden Einschätzung.",
    cards: [
      {
        title: "Mein Parkett ist grau oder stumpf",
        text: "Wenn die Oberfläche matt wirkt oder Laufstrassen sichtbar sind, helfen oft Tiefenreinigung, Pflegebehandlung oder Nachölen.",
        cta: "Graues Parkett prüfen",
        href: "/problemfaelle/parkett-grau-und-stumpf"
      },
      {
        title: "Ich habe Wasserflecken",
        text: "Bei Wasserflecken entscheidet die Tiefe der Feuchtigkeit. Helle Flecken lassen sich oft besser behandeln als dunkle oder aufgequollene Stellen.",
        cta: "Wasserfleck einschätzen",
        href: "/problemfaelle/wasserflecken-parkett"
      },
      {
        title: "Kratzer oder Hundespuren",
        text: "Viele Kratzer lassen sich lokal verbessern. Bei tiefen Spuren muss geprüft werden, ob eine Reparatur oder ein Abschliff sinnvoll ist.",
        cta: "Kratzer prüfen",
        href: "/problemfaelle/hundekratzer-parkett"
      },
      {
        title: "Der Boden hat schwarze Flecken",
        text: "Schwarze Flecken können auf tiefer eingedrungene Feuchtigkeit oder Reaktionen im Holz hinweisen. Hier ist eine saubere Einschätzung wichtig.",
        cta: "Schwarze Flecken verstehen",
        href: "/problemfaelle/schwarze-flecken-parkett"
      },
      {
        title: "Das Parkett quillt auf",
        text: "Aufgequollenes Parkett sollte nicht nur oberflächlich behandelt werden. Entscheidend ist, ob Feuchtigkeit im Holz oder Untergrund steckt.",
        cta: "Aufquellung prüfen",
        href: "/problemfaelle/parkett-quillt-auf"
      },
      {
        title: "Ich bin unsicher",
        text: "Senden Sie Fotos Ihres Bodens. Wir geben eine erste Einschätzung, welche Behandlung wahrscheinlich sinnvoll ist.",
        cta: "Fotoanalyse starten",
        href: "/tools/fotoanalyse-parkett"
      }
    ] as ProblemCard[]
  },
  services: {
    h2: "Unsere Leistungen für Parkett in Zürich",
    intro: "Jeder Parkettboden hat eine andere Oberfläche, Nutzung und Schadensgeschichte. Deshalb wählen wir die Methode nicht pauschal, sondern passend zum Zustand: reinigen, ölen, reparieren, schleifen, versiegeln oder auffrischen.",
    cards: [
      {
        title: "Parkett reinigen",
        text: "Für verschmutzte, matte oder beanspruchte Oberflächen, wenn der Boden grundsätzlich intakt ist und keine tiefen Schäden vorliegen.",
        benefit: "Frischerer Eindruck ohne kompletten Abschliff.",
        href: "/leistungen/parkett-reinigen-zuerich"
      },
      {
        title: "Parkett ölen",
        text: "Für geölte Böden, die trocken wirken, an Schutz verloren haben oder wieder gleichmässiger erscheinen sollen.",
        benefit: "Mehr Sättigung, Schutz und natürliche Holzoptik.",
        href: "/leistungen/parkett-oelen-zuerich"
      },
      {
        title: "Parkett schleifen",
        text: "Für tiefere Kratzer, alte Versiegelungen, starke Laufspuren oder Böden, die umfassend renoviert werden sollen.",
        benefit: "Starke Erneuerung der Oberfläche bei geeigneter Nutzschicht.",
        href: "/leistungen/parkett-schleifen-zuerich"
      },
      {
        title: "Parkett reparieren",
        text: "Für lokale Schäden wie Kratzer, Flecken, Druckstellen, beschädigte Dielen oder einzelne Problemstellen.",
        benefit: "Gezielte Verbesserung, ohne immer den ganzen Boden zu bearbeiten.",
        href: "/leistungen/parkett-reparieren-zuerich"
      },
      {
        title: "Parkett versiegeln",
        text: "Für Böden, die nach dem Schleifen eine robuste, pflegeleichtere Schutzschicht erhalten sollen.",
        benefit: "Widerstandsfähiger Schutz bei stärkerer Nutzung.",
        href: "/leistungen/parkett-versiegeln-zuerich"
      },
      {
        title: "Parkett auffrischen",
        text: "Für Böden, die gepflegter wirken sollen, ohne dass sofort eine komplette Renovation nötig ist.",
        benefit: "Sichtbare Aufwertung mit geringerem Eingriff.",
        href: "/leistungen/parkett-auffrischen-zuerich"
      }
    ] as ServiceCard[]
  },
  photoAnalysis: {
    h2: "Schaden fotografieren. Einschätzung erhalten.",
    text: "Sie wissen nicht, ob Ihr Parkett gereinigt, repariert, geölt oder geschliffen werden muss? Laden Sie Fotos hoch und beschreiben Sie kurz Fläche, Oberfläche und Schaden. So lässt sich der nächste sensible Schritt oft deutlich besser eingrenzen.",
    subtext: "Die Fotoanalyse ist besonders hilfreich bei Wasserflecken, Kratzern, grauen Laufstrassen, stumpfen Oberflächen, schwarzen Flecken oder Unsicherheit vor einer Wohnungsübergabe.",
    steps: [
      "Fotos vom Parkett oder Schaden hochladen",
      "Fläche, Ort und Problem kurz beschreiben",
      "Erste Einschätzung zu Methode und Aufwand erhalten",
      "Bei Bedarf Offerte oder Termin anfragen"
    ],
    cta: {
      label: "Fotoanalyse starten",
      href: "/tools/fotoanalyse-parkett"
    },
    microcopy: "Die Einschätzung per Foto ersetzt keine verbindliche Vor-Ort-Prüfung, hilft aber bei der ersten Orientierung."
  },
  costTeaser: {
    h2: "Was kostet Parkettpflege?",
    intro: "Die Kosten hängen von Fläche, Zustand, Oberfläche, Holzart und gewünschtem Ergebnis ab. Eine Reinigung ist meist weniger aufwendig als ein kompletter Abschliff, reicht aber nicht bei jedem Schaden.",
    cards: [
      {
        title: "Reinigung & Pflege",
        text: "Geeignet für matte, verschmutzte oder leicht beanspruchte Böden, wenn die Oberfläche grundsätzlich intakt ist.",
        cta: "Reinigungskosten ansehen",
        href: "/kosten/parkett-reinigung-kosten"
      },
      {
        title: "Lokale Reparatur",
        text: "Geeignet für einzelne Kratzer, Flecken, Druckstellen oder beschädigte Stellen, wenn nicht der ganze Raum betroffen ist.",
        cta: "Reparaturkosten ansehen",
        href: "/kosten/parkett-reparatur-kosten"
      },
      {
        title: "Schleifen & neue Oberfläche",
        text: "Geeignet für tiefere Schäden, alte Versiegelungen, starke Laufspuren oder eine umfassende Renovation.",
        cta: "Schleifkosten ansehen",
        href: "/kosten/parkett-schleifen-kosten"
      }
    ] as CostCard[],
    mainCta: {
      label: "Kosten berechnen",
      href: "/tools/parkett-kostenrechner"
    },
    microcopy: "Der Kostenrechner gibt eine erste Orientierung. Für eine genauere Einschätzung sind Fotos und Angaben zur Fläche hilfreich."
  },
  problemCases: {
    h2: "Typische Parkettprobleme, die wir prüfen",
    intro: "Viele Schäden lassen sich erst richtig einschätzen, wenn man Oberfläche, Tiefe und betroffene Fläche betrachtet. Diese Problemfälle treten besonders häufig auf.",
    list: [
      {
        title: "Wasserflecken",
        text: "Helle, dunkle oder aufgequollene Stellen nach Feuchtigkeit.",
        href: "/problemfaelle/wasserflecken-parkett"
      },
      {
        title: "Hundekratzer",
        text: "Kratzspuren durch Krallen, oft im Eingangsbereich oder bei Laufwegen.",
        href: "/problemfaelle/hundekratzer-parkett"
      },
      {
        title: "Schwarze Flecken",
        text: "Tiefe Verfärbungen, oft durch Feuchtigkeit oder Reaktionen im Holz.",
        href: "/problemfaelle/schwarze-flecken-parkett"
      },
      {
        title: "Graues oder stumpfes Parkett",
        text: "Matter Boden, Laufstrassen oder ungleichmässige Oberfläche.",
        href: "/problemfaelle/parkett-grau-und-stumpf"
      },
      {
        title: "Aufgequollenes Parkett",
        text: "Verformungen nach Wasser, Feuchtigkeit oder Untergrundproblemen.",
        href: "/problemfaelle/parkett-quillt-auf"
      },
      {
        title: "Tiefe Kratzer",
        text: "Fühlbare Schäden, die über die normale Nutzung hinausgehen.",
        href: "/problemfaelle/tiefe-kratzer-parkett"
      },
      {
        title: "Laufstrassen",
        text: "Stärker beanspruchte Wege im Wohnbereich, Flur oder Büro.",
        href: "/problemfaelle/laufstrassen-parkett"
      },
      {
        title: "Falsche Reinigung",
        text: "Schäden durch zu viel Wasser, falsche Reiniger, Dampfreiniger oder ungeeignete Pflegeprodukte.",
        href: "/problemfaelle/parkett-nach-falscher-reinigung"
      }
    ],
    cta: {
      label: "Problem auswählen",
      href: "/problemfaelle"
    }
  },
  beforeAfter: {
    h2: "Vorher-Nachher: Was Parkettpflege bewirken kann",
    intro: "Ob Reinigung, lokale Reparatur oder Abschliff sinnvoll ist, zeigt sich am besten an echten Beispielen. Vorher-Nachher-Fälle machen sichtbar, welche Verbesserungen realistisch sind – und wo die Grenzen liegen.",
    cases: [
      {
        id: 1,
        title: "Wasserfleck auf Eichenparkett",
        problem: "Dunkler Fleck unter einem Blumentopf",
        text: "Lokale Behandlung und Nachölung einer dunklen Stelle unter einem Blumentopf.",
        slug: "wasserfleck-parkett-zuerich-seefeld"
      },
      {
        id: 2,
        title: "Graue Laufstrassen im Wohnbereich",
        problem: "Abgenutzte und matte Eichenriemen",
        text: "Tiefenreinigung und Pflegebehandlung für einen sichtbar frischeren Gesamteindruck.",
        slug: "laufstrasse-parkett-zuerich-enge"
      },
      {
        id: 3,
        title: "Hundekratzer im Eingangsbereich",
        problem: "Feine Krallenspuren im Lack",
        text: "Gezielte Verbesserung einzelner Kratzspuren mit anschliessender Oberflächenangleichung.",
        slug: "hundekratzer-parkett-zuerich-wiedikon"
      }
    ] as CaseTeaser[],
    cta: {
      label: "Vorher-Nachher-Fälle ansehen",
      href: "/faelle"
    }
  },
  process: {
    h2: "So läuft die Parkettpflege ab",
    intro: "Gute Parkettpflege beginnt nicht mit der Maschine, sondern mit der richtigen Einschätzung. Deshalb klären wir zuerst Zustand, Oberfläche und Ziel.",
    steps: [
      {
        step: 1,
        title: "Fotos oder Anfrage senden",
        text: "Sie senden Bilder, Fläche, Ort und eine kurze Beschreibung des Problems."
      },
      {
        step: 2,
        title: "Zustand einschätzen",
        text: "Wir prüfen, ob Reinigung, Reparatur, Ölen, Schleifen oder Versiegeln sinnvoll ist."
      },
      {
        step: 3,
        title: "Vorgehen und Kostenrahmen klären",
        text: "Sie erhalten eine transparente Orientierung zu Aufwand, Methode und möglichem Ergebnis."
      },
      {
        step: 4,
        title: "Ausführung planen",
        text: "Termin, Vorbereitung, Zugänglichkeit und Ablauf werden sauber abgestimmt."
      },
      {
        step: 5,
        title: "Parkett fachgerecht behandeln",
        text: "Die Behandlung erfolgt passend zu Holzart, Oberfläche und Zustand des Bodens."
      },
      {
        step: 6,
        title: "Pflegeempfehlung erhalten",
        text: "Nach der Ausführung erhalten Sie Hinweise, wie der Boden länger schön und geschützt bleibt."
      }
    ] as StepItem[]
  },
  whyUs: {
    h2: "Warum parkett-pflege.ch?",
    intro: "Parkett ist kein beliebiger Bodenbelag. Holzart, Oberfläche, Pflegezustand und Schadenstiefe entscheiden darüber, welche Behandlung sinnvoll ist. Genau deshalb beginnt gute Parkettpflege mit einer sauberen Einschätzung.",
    benefits: [
      {
        title: "Spezialisierung auf Parkett",
        text: "Wir denken nicht in allgemeiner Reinigung, sondern in Holz, Oberfläche, Pflegezustand und Werterhalt."
      },
      {
        title: "Erhalten statt ersetzen",
        text: "Viele Böden lassen sich reinigen, auffrischen oder lokal reparieren, bevor ein Austausch nötig wird."
      },
      {
        title: "Klare Einschätzung",
        text: "Wir erklären, wann Reinigung reicht, wann Reparatur sinnvoll ist und wann Schleifen die bessere Lösung ist."
      },
      {
        title: "Lokaler Fokus",
        text: "Der Fokus liegt auf Zürich und Umgebung – für Wohnungen, Häuser, Verwaltungen und Gewerbeflächen."
      },
      {
        title: "Sichtbare Ergebnisse",
        text: "Vorher-Nachher-Fälle zeigen, was realistisch möglich ist und wo Grenzen bestehen."
      },
      {
        title: "Verständliche Beratung",
        text: "Sie müssen kein Parkettprofi sein. Wir erklären die Optionen so, dass Sie entscheiden können."
      }
    ] as BenefitItem[]
  },
  serviceArea: {
    h2: "Parkettpflege im Raum Zürich",
    text: "parkett-pflege.ch betreut Parkettböden in Zürich und Umgebung – von Eigentumswohnungen und Einfamilienhäusern bis zu Mietobjekten, Verwaltungen, Büros und Gewerbeflächen.",
    subtext: "Typische Anfragen im Raum Zürich betreffen matte oder graue Böden, Wasserflecken, Hundekratzer, Parkettpflege vor Wohnungsübergaben und Renovationen nach längerer Nutzung.",
    municipalities: [
      "Zürich",
      "Winterthur",
      "Uster",
      "Dübendorf",
      "Schlieren",
      "Dietikon",
      "Horgen",
      "Meilen",
      "Küsnacht",
      "Zollikon",
      "Thalwil",
      "Adliswil",
      "Wallisellen",
      "Opfikon",
      "Kloten",
      "Regensdorf",
      "Bülach"
    ],
    cta: {
      label: "Parkettpflege in Zürich ansehen",
      href: "/zuerich/parkettpflege-zuerich"
    }
  },
  guides: {
    h2: "Ratgeber: Parkett richtig pflegen und Schäden vermeiden",
    intro: "Wer Parkett richtig pflegt, vermeidet viele Schäden. In unseren Ratgebern erklären wir, welche Pflege zu welcher Oberfläche passt, wann Vorsicht geboten ist und wann eine professionelle Behandlung sinnvoll wird.",
    list: [
      {
        title: "Geöltes Parkett richtig pflegen",
        text: "Wie geölte Oberflächen gereinigt, gepflegt und nachgeölt werden sollten.",
        href: "/ratgeber/geoeltes-parkett-richtig-pflegen"
      },
      {
        title: "Lackiertes Parkett pflegen",
        text: "Was bei versiegelten Oberflächen wichtig ist und welche Fehler Schäden verursachen können.",
        href: "/ratgeber/lackiertes-parkett-pflegen"
      },
      {
        title: "Parkett ölen oder versiegeln?",
        text: "Die wichtigsten Unterschiede zwischen natürlicher Oberfläche und robuster Schutzschicht.",
        href: "/ratgeber/parkett-oelen-oder-versiegeln"
      },
      {
        title: "Parkett schleifen oder reinigen?",
        text: "Wann eine Reinigung reicht und wann ein Abschliff sinnvoll wird.",
        href: "/ratgeber/parkett-schleifen-oder-reinigen"
      },
      {
        title: "Dampfreiniger auf Parkett",
        text: "Warum zu viel Feuchtigkeit riskant sein kann und worauf Sie achten sollten.",
        href: "/ratgeber/dampfreiniger-auf-parkett"
      }
    ],
    cta: {
      label: "Alle Ratgeber ansehen",
      href: "/ratgeber"
    }
  },
  faq: {
    h2: "Häufige Fragen zur Parkettpflege",
    items: [
      {
        question: "Muss Parkett immer geschliffen werden?",
        answer: "Nein. Wenn die Oberfläche nur matt, verschmutzt oder leicht beansprucht ist, reichen oft Reinigung, Pflege oder Nachölen. Schleifen wird vor allem bei tieferen Kratzern, alten Versiegelungen, starken Laufspuren oder tiefen Flecken relevant."
      },
      {
        question: "Kann man Wasserflecken im Parkett entfernen?",
        answer: "Das hängt davon ab, wie tief die Feuchtigkeit eingedrungen ist. Helle oberflächliche Flecken lassen sich oft besser behandeln als dunkle oder aufgequollene Stellen. Eine Fotoanalyse hilft bei der ersten Einschätzung."
      },
      {
        question: "Was kostet Parkettpflege in Zürich?",
        answer: "Die Kosten hängen von Fläche, Zustand, Oberfläche und Behandlung ab. Reinigung, lokale Reparatur und kompletter Abschliff unterscheiden sich deutlich im Aufwand. Der Kostenrechner gibt eine erste Orientierung."
      },
      {
        question: "Kann man Hundekratzer im Parkett reparieren?",
        answer: "Viele Hundekratzer lassen sich lokal verbessern. Bei tiefen Kratzern oder grossflächigen Schäden kann eine intensivere Behandlung oder ein Abschliff nötig sein."
      },
      {
        question: "Was ist besser: Parkett ölen oder versiegeln?",
        answer: "Geölte Oberflächen wirken natürlicher und lassen sich oft lokal pflegen. Versiegelte Flächen sind robuster gegen bestimmte Belastungen, aber lokale Reparaturen sind schwieriger. Die passende Lösung hängt von Nutzung und gewünschter Optik ab."
      },
      {
        question: "Wie funktioniert die Fotoanalyse?",
        answer: "Sie laden Fotos des Bodens oder Schadens hoch und beschreiben Fläche, Oberfläche und Problem. Daraus lässt sich meist ableiten, welche Behandlung wahrscheinlich sinnvoll ist."
      },
      {
        question: "Arbeitet parkett-pflege.ch im ganzen Raum Zürich?",
        answer: "Ja, der Fokus liegt auf Zürich und Umgebung, darunter Winterthur, Uster, Dübendorf, Horgen, Meilen, Küsnacht, Zollikon, Thalwil und weitere Orte."
      },
      {
        question: "Kann Parkettpflege den Boden wie neu machen?",
        answer: "Manche Böden lassen sich sehr stark verbessern, andere nur teilweise. Das Ergebnis hängt von Holzart, Oberfläche, Schadenstiefe und bisheriger Pflege ab. Seriös ist eine Einschätzung erst nach Fotos oder Besichtigung."
      },
      {
        question: "Kann ich Parkett selbst reinigen?",
        answer: "Normale Unterhaltspflege ist möglich, wenn die Oberfläche bekannt ist und geeignete Mittel verwendet werden. Bei Flecken, Aufquellungen, falscher Reinigung oder tiefen Kratzern sollte der Schaden zuerst geprüft werden."
      },
      {
        question: "Wie schnell bekomme ich eine Einschätzung?",
        answer: "Bei einer Fotoanalyse können die wichtigsten Informationen oft schnell eingeordnet werden. Je besser die Fotos und Angaben zu Fläche, Oberfläche und Schaden sind, desto genauer ist die erste Einschätzung."
      }
    ] as FAQItem[]
  },
  finalCta: {
    h2: "Unsicher, was Ihr Parkett braucht?",
    text: "Senden Sie Fotos Ihres Bodens und erhalten Sie eine erste Einschätzung. So erkennen Sie schneller, ob Reinigung, Reparatur, Ölen, Schleifen oder Versiegeln sinnvoll ist.",
    primaryCta: {
      label: "Fotoanalyse starten",
      href: "/tools/fotoanalyse-parkett"
    },
    secondaryCta: {
      label: "Kosten berechnen",
      href: "/tools/parkett-kostenrechner"
    },
    tertiaryCta: {
      label: "Offerte anfragen",
      href: "/kontakt"
    },
    microcopy: "Ideal bei Flecken, Kratzern, Laufstrassen, stumpfen Böden oder Unsicherheit vor einer Renovation."
  },
  footer: {
    brand: {
      logo: "parkett-pflege.ch",
      claim: "Parkett erhalten. Werte bewahren.",
      text: "Spezialisiert auf Parkettpflege, Parkettreparatur und Parkettrenovation im Raum Zürich."
    },
    services: {
      title: "Leistungen",
      items: [
        { label: "Parkett reinigen", href: "/leistungen/parkett-reinigen-zuerich" },
        { label: "Parkett ölen", href: "/leistungen/parkett-oelen-zuerich" },
        { label: "Parkett schleifen", href: "/leistungen/parkett-schleifen-zuerich" },
        { label: "Parkett reparieren", href: "/leistungen/parkett-reparieren-zuerich" },
        { label: "Parkett versiegeln", href: "/leistungen/parkett-versiegeln-zuerich" },
        { label: "Parkett auffrischen", href: "/leistungen/parkett-auffrischen-zuerich" }
      ]
    },
    problems: {
      title: "Problemfälle",
      items: [
        { label: "Wasserflecken", href: "/problemfaelle/wasserflecken-parkett" },
        { label: "Hundekratzer", href: "/problemfaelle/hundekratzer-parkett" },
        { label: "Schwarze Flecken", href: "/problemfaelle/schwarze-flecken-parkett" },
        { label: "Graues Parkett", href: "/problemfaelle/parkett-grau-und-stumpf" },
        { label: "Aufgequollenes Parkett", href: "/problemfaelle/parkett-quillt-auf" },
        { label: "Tiefe Kratzer", href: "/problemfaelle/tiefe-kratzer-parkett" }
      ]
    },
    toolsAndKnowledge: {
      title: "Tools & Wissen",
      items: [
        { label: "Fotoanalyse", href: "/tools/fotoanalyse-parkett" },
        { label: "Kostenrechner", href: "/tools/parkett-kostenrechner" },
        { label: "Vorher-Nachher", href: "/faelle" },
        { label: "Ratgeber", href: "/ratgeber" },
        { label: "FAQ", href: "/faq" },
        { label: "Blog", href: "/blog" }
      ]
    },
    regions: {
      title: "Region",
      items: [
        { label: "Zürich", href: "/zuerich/parkettpflege-zuerich" },
        { label: "Parkett schleifen Zürich", href: "/zuerich/parkett-schleifen-zuerich" },
        { label: "Parkett reparieren Zürich", href: "/zuerich/parkett-reparieren-zuerich" },
        { label: "Winterthur", href: "/zuerich/parkettpflege-winterthur" },
        { label: "Uster", href: "/zuerich/parkettpflege-uster" },
        { label: "Dübendorf", href: "/zuerich/parkettpflege-duebendorf" }
      ]
    },
    legal: {
      items: [
        { label: "Impressum", href: "/impressum" },
        { label: "Datenschutz", href: "/datenschutz" },
        { label: "Kontakt", href: "/kontakt" }
      ]
    }
  }
};
