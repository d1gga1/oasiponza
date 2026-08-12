# Oasi B&B — Ponza · Nuovo sito

Sito statico, bilingue (IT/EN), con animazioni. Nessun build, nessuna dipendenza: si apre facendo doppio clic su `index.html`.

## Pagine

| File | Pagina originale |
|---|---|
| `index.html` | Home |
| `lo-stabile.html` | Lo Stabile |
| `camere.html` | Camere |
| `servizi.html` | Servizi |
| `arcipelago.html` | L'arcipelago |
| `come-raggiungerci.html` | Come raggiungerci |
| `info-utili.html` | Info Utili |
| `info-e-prezzi.html` | Info e Prezzi |
| `contatti.html` | Contatti |

## Struttura

```
assets/css/style.css   ← design system + tutte le animazioni
assets/js/site.js      ← header, footer, motion engine (unica fonte per il menu)
assets/img/hero/       ← 6 immagini del carosello home (2200×1237, 16:9)
assets/img/esterni/    ← struttura e vialetti
assets/img/giardino/   ← galleria giardino (23 foto)
assets/img/camere/     ← camere e cucinino (7 foto)
assets/img/colazione/  ← sala e buffet
assets/video/          ← 5 video .mp4 + poster .jpg
```

Header e footer sono generati da `site.js`: per aggiungere o rinominare una voce di menu basta modificare l'array `NAV` in cima al file, e cambia su tutte le 9 pagine.

## Immagini e video

Tutte le foto del vecchio sito sono state rimosse. Le 63 immagini e i 7 video attuali vengono dalle cartelle `nuove_foto_e_video` e `foto_parte2`, ridimensionati e ottimizzati per il web (max 2200 px sugli hero, 1500 px sulle gallerie).

**Controllo doppioni.** I file sono stati confrontati con un hash percettivo (`foto_parte2` conteneva 55 foto su 70 già presenti nella prima cartella) e i video con checksum MD5. Nessuna immagine compare due volte nella stessa pagina; alcune ricorrono su pagine diverse come sfondo, cosa voluta.

Scartati: 6 doppioni interni, 2 screenshot con interfaccia WhatsApp, 1 screenshot di un portale di prenotazione, 1 foto di uno schermo, 1 video con watermark Instagram, 1 girato di traverso, 4 scatti sfocati o mal inquadrati. Due foto avevano il watermark "Redmi Note 9 Pro": ritagliato.

**Video.** Ricodificati in H.264 con `faststart` e senza traccia audio, tranne la banda della home. L'hero della home è un estratto delle riprese col drone (facciata → volo sulla baia di Santa Maria). Cinque video verticali sono usati come "reel" 9:16, uno orizzontale come banda a tutta larghezza. Partono da soli solo quando entrano nello schermo e si fermano quando escono, per non consumare batteria.

Le cartelle `nuove_foto_e_video` e `foto_parte2` con gli originali non servono più al sito: si possono spostare altrove o cancellare (sono circa 190 MB in tutto).

## Cose da personalizzare

1. **Prezzi** — in `info-e-prezzi.html` la tabella ha i trattini `— €` come nell'originale. Sostituiteli con gli importi reali.
2. **Camere** — le tre tipologie (giardino / vista mare / familiare) sono una ricostruzione plausibile dai testi originali, e le foto sono state abbinate a occhio. Correggete nomi, descrizioni e foto in `camere.html`.
3. **Mappa** — il segnaposto OpenStreetMap è centrato su Santa Maria. Per la posizione esatta cambiate `marker=40.9175%2C12.9620` in `contatti.html` e `come-raggiungerci.html`.
4. **Form** — l'invio apre il client di posta con la richiesta precompilata (funziona ovunque, senza server). Per ricevere le richieste direttamente in casella si può collegare Formspree o simili modificando `initForm()` in `site.js`.

## Lingua

Ogni testo esiste in due versioni marcate `data-lang="it"` e `data-lang="en"`; il CSS nasconde quella non attiva. La scelta resta salvata nel browser. Per aggiungere una lingua servirebbe estendere quella regola in `style.css`.

## Animazioni incluse

Preloader, transizioni a sipario tra le pagine, slideshow Ken Burns, parallasse su hero e immagini, rivelazioni allo scroll (fade, slide, clip, stagger), titoli a righe che salgono, cursore personalizzato con effetto magnetico sui bottoni, barra di progresso, marquee, tilt 3D sulle card, contatori animati, accordion, lightbox con frecce e tastiera, menu mobile a cerchio, header che si nasconde allo scroll.

Tutto rispetta `prefers-reduced-motion`: chi ha disattivato le animazioni di sistema vede il sito statico.
