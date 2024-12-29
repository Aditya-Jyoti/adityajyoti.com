---
title: "How I set up my productivity suite"
description: "How I managed to sync up my calendars and todos with my mobile phone and laptop using self hosted services. SyncThing is amazing for all of this."
pubDate: "Dec 29 2024"
updatedDate: "Dec 30 2024"
imgDesc: "My dashboard setup with calendar and todos"
heroImage: "/blogs/post1-hero.png"
---

I recently bought a [virtual private server](https://aws.amazon.com/what-is/vps/) (VPS) to experiment. Don't know what a virtual private server is? Don't worry I was in the same shoes just a while back. In simple terms a virtual private private server is like having a computer but it's managed by someone else. They provide you with internet and power. The catch? You can only access the computer through shell commands like `ssh`.

I have always wanted to maintain a common TODO list and Calendar between my PC and Mobile but I never found a good enough solution that did not rely on buying some extra "premium" software. Now that I had my own VPS and access to the [awesome selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted) list, I felt it was time to fix the problem.

---

## How I solved my problem

### Calendar

Going with syncing calendars first because that's what gave me the most trouble out of everything here.

#### The Server

What you need is a [CalDav](https://help.one.com/hc/en-us/articles/115005586949-What-is-CalDAV) server. It's a shareable calendar which allows you to add or remove events and it gets synced for everyone with access to that caldav link.

There are a lot out there for use (mentioned in [here](https://github.com/awesome-selfhosted/awesome-selfhosted?tab=readme-ov-file#calendar--contacts)) but I went ahead with [Radical](https://github.com/Kozea/Radicale) since it was quite popularly recommended in the reddit post I was reading.

Here is the `docker-compose.yml` file that I used to host this up

```yml
services:
  radicale:
    image: tomsquest/docker-radicale
    container_name: radicale
    ports:
      - ${RADICAL_PORT}:5232
    init: true
    read_only: true
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - SETUID
      - SETGID
      - CHOWN
      - KILL
    deploy:
      resources:
        limits:
          memory: 256M
          pids: 50
    healthcheck:
      test: curl -f http://127.0.0.1:5232 || exit 1
      interval: 30s
      retries: 3
    restart: unless-stopped
    volumes:
      - ${RADICAL_VOLUME}:/data
```

<br/>

If you don't know what a `docker-compose.yml` file is then the official [docker docs](https://docs.docker.com/compose/gettingstarted/) are quite comprehensive, explaining what the file does is quite out of scope for this article.

<br/>

#### The Frontend

Now one thing that I have to complain is that there are never really good frontends for a lot of selfhosted applications regardless of how popular it may be. On the same note finding a frontend web renderer for a CalDav calendar was equally as troublesome. But in the end I somehow stumbled upon [AgenDav](https://github.com/agendav/agendav).

Agendav is quite a minimal web front for a calendar with the only issue being its Auth Token expires quite soon (I am currently in the process of finding a fix for that). It makes it quite easy, the only step being giving it the calendar link and it spits out a ready to use calendar.

Here is the `docker-compose.yml` file that I used to host this up

```yml
version: "2"

services:
  agendav:
    image: ghcr.io/nagimov/agendav-docker:latest
    container_name: agendav

    environment:
      - AGENDAV_SERVER_NAME=${CALDAV_URL_SERVER}
      - AGENDAV_TITLE=${TITLE}
      - AGENDAV_FOOTER=${DESCRIPTION}
      - AGENDAV_ENC_KEY=${PASSWORD}
      - AGENDAV_CALDAV_SERVER=${CALENDAR_LINK}
      - AGENDAV_CALDAV_PUBLIC_URL=${CALDAV_URL_SERVER}
      - AGENDAV_TIMEZONE=${TIMEZONE}
      - AGENDAV_LANG=en
      - AGENDAV_LOG_DIR=/app/log

    ports:
      - "${AGENDAV_PORT}:8080"
    volumes:
      - ${AGENDAV_DATA_VOLUME}:/app/data
      - ${AGENDAV_LOGS_VOLUME}:/app/log
      - ${AGENDAV_TEMP_VOLUME}:/app/temp

    command: sh -c "chown -R www-data:www-data /app/log && chmod -R 775 /app/log && apache2-foreground"
    restart: unless-stopped
```

<br/>

That's the desktop set up. But now on to the phone.

It is actually very simple on mobile.

1. 1 Install the [DavX5](https://www.davx5.com/) app on android (Im sorry I have no idea about apple devices).
2. 2 Provide it with the calendar link from your caldav server.
3. 3 Almost all android phones have a native calendar application. Go to its settings and there should now be an option to select your caldav calendar as viewable calendar

That should be about it for the calendar section, once you get to actually self hosting things and using them you find it to be more linear. You set up a central server and all your end devices query it for data. Each end device will have its own frontend renderer for the data being transferred from the server.

<br/>

![server](/blogs/post1-caldav.png)

<br/>

### TODOs

In a similar fashion I set up my todos. Here is everything I used

1. 1 Obsidian - Markdown editing on mobile
2. 2 NeoVim - Markdown editing on pc
3. 3 SyncThing - Syncing of files between my mobile, server and pc

#### The Approach

Syncthing is a peer to peer file synchronization application, ie, it takes my files from one end device and puts it onto another end device. Using this principle I would

1. 1 Sync all my files, including my <strong>TODO.md</strong> with my server.
2. 2 Sync my PC with my server using syncthing
3. 3 Sync my Mobile with my server using syncthing

This would essentially treat my server as an always active proxy client via which both my mobile and pc would get synced with each other in the background. This is a super neat approach because I don't even have to actively monitor anything. Just edit the TODO.md file anywhere and its good to go.

Here is the `docker-compose.yml` file that I used to host this up

```yml
services:
  syncthing:
    image: syncthing/syncthing
    hostname: my-syncthing
    user: 1000:1000
    volumes:
      - ${SYNCTHING_STORAGE_VOLUME}:/var/syncthing
    ports:
      - ${SYNCTHING_WEB_PORT}:8384 # Web UI
      - ${SYNCTHING_TCP_PORT}:22000/tcp # TCP file transfers
      - ${SYNCTHING_UDP_PORT}:22000/udp # QUIC file transfers
      - ${SYNCTHING_LOCAL_PORT}:21027/udp # Receive local discovery broadcasts
    restart: unless-stopped
```

<br/>

#### The Frontend

I again was not able to find a good raw markdown file renderer that exports to web via static files, but I did stumble upon [flatnotes](https://github.com/dullage/flatnotes) which achieves essentially the same

Here is the `docker-compose.yml` file that I used to host this up

```yml
services:
  flatnotes:
    container_name: flatnotes
    image: dullage/flatnotes:latest
    environment:
      PUID: 1000
      PGID: 1000
      FLATNOTES_AUTH_TYPE: "password"
      FLATNOTES_USERNAME: ${USERNAME}
      FLATNOTES_PASSWORD: ${PASSWORD}
      FLATNOTES_SECRET_KEY: ${SECRET_KEY}
    volumes:
      - "${SYNCTHING_STORAGE_VOLUME}:/data"
      - "${FLATNOTES_SEARCH_INDEX}:/data/.flatnotes"
    ports:
      - "${FLATNOTES_PORT}:8080"
    restart: unless-stopped
```

<br/>
<br/>

My implementation is not the best and may also be crude but its working for me and was somewhat "simpler" than other solutions I found online. If you do want to go with a full blown personal management system then [Nextcloud](https://github.com/nextcloud) is an amazing option. It has everything all in one with ability for adding extra plugins.

But just like how I use Neovim or VS Code in place of an IDE, I prefer more lightweight solutions.
