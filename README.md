# Easy stremio on Docker

## Fork Disclaimer
- This is a fork of the original [stremio-docker rep](https://github.com/tsaridas/stremio-docker)
- This fork modifes the server.js and adds the ability to define a prefix
  - This Prefix can be added with the env URL_PREFIX
  - This solution will probably not work. 
  - Recommended is trying [nginx conf](https://github.com/Zaarrg/stremio-docker-prefix#nginx-setup) first.

| Env | Default | Example           | Description                      |
| - | - |-------------------|----------------------------------|
| `URL_PREFIX` | - | `/stremio-server` | Sets a url prefix for the server |


## Nginx Setup
 
There are two ways to setup nginx. Everything here was setup using the [stremio-docker](https://github.com/tsaridas/stremio-docker) image.


#### 1. Using a prefix

```nginx configuration
    # Stremio-specific route
    location /stremio-server/ {
        # Strip stremio-server
        rewrite ^/stremio-server/(.*) /$1 break;

        proxy_pass http://stremio-container:11470;
    }
```
   - The **Streaming Server URL** would be https://stremio.mydomain.com/stremio-server/
   - If this does not work and videos for example dont play then you can try by explicitly allowing all routes the server might call.
     - You can also find all routes in [server-routes.md](https://github.com/Zaarrg/stremio-docker-prefix/blob/main/server-routes.md)
     - You can find a example.conf [here](https://github.com/Zaarrg/stremio-docker-prefix/blob/main/nginx-prefix.conf)

#### 2. Explicitly allowing (Recommended)

```nginx configuration
# Stremio-specific routes
    location ~ ^/(hlsv2|casting|local-addon|proxy|rar|zip|settings|create|removeAll|samples|probe|subtitlesTracks|opensubHash|subtitles|network-info|device-info|get-https|hwaccel-profiler|status|exec|stream) {
        proxy_pass http://stremio-container:11470;
    }

    location ~ ^/([^/]+)/(stats\.json|create|remove|destroy) {
        proxy_pass http://stremio-container:11470;
    }

    location ~ ^/([^/]+)/([^/]+)/(stats\.json|hls\.m3u8|master\.m3u8|stream\.m3u8|dlna|thumb\.jpg) {
        proxy_pass http://stremio-container:11470;
    }

    location ~ ^/([^/]+)/([^/]+)/(stream-q-[^/]+\.m3u8|stream-[^/]+\.m3u8|subs-[^/]+\.m3u8) {
        proxy_pass http://stremio-container:11470;
    }

    location ~ ^/([^/]+)/([^/]+)/(stream-q-[^/]+|stream-[^/]+)/[^/]+\.(ts|mp4) {
        proxy_pass http://stremio-container:11470;
    }

    location ~ ^/yt/([^/]+)(\.json)? {
        proxy_pass http://stremio-container:11470;
    }

    location = /(thumb\.jpg|stats\.json) {
        proxy_pass http://stremio-container:11470;
    }
```
- The **Streaming Server URL** would be https://stremio.mydomain.com/
- This solution should always work.
- You can find a example.conf [here](https://github.com/Zaarrg/stremio-docker-prefix/blob/main/nginx-example.conf)
- This also allows for the **Stremio Web URL** and **Streaming Server URL** to be the same:
  - **Stremio Web URL**  accessible at: https://stremio.mydomain.com/
  - **Streaming Server URL**: https://stremio.mydomain.com/


## Basic Auth
- With those solutions basic auth is as easy as adding it for the base domain https://stremio.mydomain.com/
- Stremio Web, Stremio Server and any addons are on the same base url and will be therefor protected!
- With basic auth simply visit Stremio Web login with basic auth and you are good to go!


## Thoughts

As of my knowledge for now these are the best solutions to achive basic auth by having Stremio Web, Stremio Server and any addons on one url.

I personally recommend the second nginx setup as this allows for the server url to be the same as the web url and therefor begin a quite smooth solution. Even tho this might have the drawback when the Stremio Server gets updated it might block new endpoints.

Thank you for reading and have a wonderful time <3
