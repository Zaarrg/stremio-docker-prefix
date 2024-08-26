### router.use:
- /hlsv2
- /casting
- /local-addon
- /proxy
- /rar
- /zip

### router.post:
- /settings
- /create

### router.get:
#### Dynamic:
- /:infoHash/stats.json
- /:infoHash/:idx/stats.json
- /:infoHash/create
- /:infoHash/remove
- /:infoHash/:idx
- /:infoHash/:idx/*
- /:infoHash/:videoId/:playlist/:HLSSegment?


- /:first/:second/hls.m3u8
- /:first/:second/master.m3u8
- /:first/:second/stream.m3u8
- /:first/:second/stream-q-:quality.m3u8
- /:first/:second/stream-:stream.m3u8
- /:first/:second/stream-q-:quality/:seg.ts
- /:first/:second/stream-:stream/:seg.ts
- /:first/:second/mp4stream-q-:quality.m3u8
- /:first/:second/mp4stream-q-:quality/:seg.mp4
- /:first/:second/dlna
- /:first/:second/subs-:lang.m3u8
- /:first/:second/thumb.jpg


- /:id/:track.m3u8
- /:id/:track/init.mp4
- /:id/:track/segment:sequenceNumber.:ext

- /:id/destroy

#### Static:

- /yt/:id.json
- /yt/:id


- /thumb.jpg
- /stats.json
- /removeAll
- /samples/
- /probe
- /subtitlesTracks
- /opensubHash
- /subtitles
- /network-info
- /device-info
- /settings
- /get-https
- /hwaccel-profiler
- /status
- /exec
- /stream

