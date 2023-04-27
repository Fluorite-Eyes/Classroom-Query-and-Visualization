# GL02_A21_ChevalDeTroyes



## Description:

The principal function aims to ease builiding management and the organization of users. In fact, the software has to follow up teaching rooms occupancy. It is a command line interface toom.
The software is going to use an export of a CRU data format that defines courses timeslots for the available rooms. 

It offers several options. Indeed, the users are able to look for the rooms of a course and the maximum capacity for a room. Also, they can check when a desired room is free during the week. There is the possibility to check which rooms are available at a defined time. 


The software is developped with Javascript language. 

## Necessary modules to install:

$ npm install:  @colors 
                @types
                ansi
                async
                arr-flatten
                arr-swap
                balanced-match
                brace-expansion
                choices-separator
                cliui
                clone
                color
                collection-visit
                commander
                concat-map
                cycle
                d3
                debug
                define-propertu
                delaunator
                duplexer 
                emoji-regex
                error-symbol
                escalade
                event-stream
                eyes
                extend-shallow
                fast-deep-equal
                fast-json-patch
                fast-json-stable-stringify
                from
                fs.realpath
                get-caller-file
                glob
                ical-generator
                iconv-lite
                inflight
                info-symbol
                inherits
                internmap
                is
                jasmine
                jasmine-core
                json-stringify-pretty-compact
                kind-of
                koalas
                lazy-cache
                lodash
                log
                lru-ache
                map
                mingo
                minimatch
                ms
                mute-stream
                node-fetch
                object-visit
                once
                path-is-absolute
                pause-stream
                pointer-symbol
                prompt
                prompt-sync
                radio-symbol
                read
                require-directory
                revalidator
                robust-predicates
                rw
                safer-buffer
                save
                semver
                set
                shallow-clone
                split
                stack-trace
                stream-combiner
                string-width
                strip-ansi
                strip-color
                success-symbol
                terminal-paginator
                through
                time-stamp
                toggle-array
                to-object-path
                topojson-client
                tr46
                tslib
                uuid-random
                warning-symbol
                webidi-conversions
                whatwg-url
                winston
                wrap-ansi
                wrappy
                y18n
                yallist
                yargs
                yargs-parser
                vega
                vega-lite



## The specific functions:

- SPEC_1 : import a CRU format
- SPEC_2 : list the rooms associated to a course given
- SPEC_3 : show the maximum capacity for a room given
- SPEC_4 : show the accessibility of rooms for a defined timeslot
- SPEC_5 : generate an iCalendar file for a certain period of time 
- SPEC_6 : verify that a room is only used by one ourse on a same time without overflow 
- SPEC_7 : show the occupancy of a room 
- SPEC_8 : classify the rooms according their occupancy


## Use:

- Start

$ node Main.js 

It will show you the main menu with the different options. Before that, you have to choose if you want to import your own PGC files or the default ones (SPEC_1). Then, the menu will show you 7 options. 

SPEC_2
Option 1 : see the classrooms related to a subject

SPEC_3
Option 2 : visualize the capacity of a classroom 

SPEC_4
Option 3 : verify the accessibility of a room at a certain moment

SPEC_5
Option 4 : generate an iCalendar file

SPEC_7
Option 5 : show the occupation rate of a classroom at a certain moment

SPEC_8
Option 6 : show classrooms in the order of capacity

Option 0 : exit program



## License

BSD 3-Clause License

Copyright (c) 2022, zhaixiny
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

## Link for the wiki :
[Wiki](https://git.utt.fr/zhaixiny/gl02_a21_chevaldetroyes/-/wikis/Getting-Started-Guide)

## List of contributors:

## Maintainers : 
Walid Rami
Jasser Chatba
Mohamed Ikiss
Zhifan Lin   

## Development Team :
Xinyuan Zhai
Lysandre Pozzo
Luca Belz
Jiashun Chen


