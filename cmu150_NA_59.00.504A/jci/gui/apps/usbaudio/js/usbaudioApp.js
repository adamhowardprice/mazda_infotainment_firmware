/*
 Copyright 2012 by Johnson Controls
 __________________________________________________________________________

 Filename: usbaudioApp.js
 __________________________________________________________________________

 Project: JCI-IHU
 Language: EN
 Author: ayonchn
 Date: 10-May-2012
 __________________________________________________________________________

 Description: IHU GUI System App

 Revisions:
 v0.1 (10-May-2012)  usbaudioApp created for initial testing of active panel content
 v0.2 (06-June-2012) updated usbaudio for new debug system. Added usbaudioAppTest.js
 v0.3 (11-June-2012) filled out context data for full ListCtrl buttons -aganesar
 v0.4 (14-June-2012) Added dictionaires and functionality for Japanese -aganesar
 v0.5 (26-June-2012) Updated app standard functions.
 v0.6 (28-August-2012) Swithced to Common for Global events
 v0.7 (30-Aug-2012) Updated to use new selectCallbacks and appData
 v0.8 (06-Sep-2012) Updated to use new UMP updates
 v0.9 (10-Sep-2012) Integrate with latest wireframes/spreadsheet - ayonchn
 v1.0 (21-Jan-2013) AppSDK inregration - ayonchn
 v1.1 (17-Sep-2013) Dictionaries updated (SW00132354) - aikonot
 v1.2 (18-Jun-2014) GUI_USBAUDIO: MY15 Graphic Asset Update and Clean Up (SW00150288) - aikonot
 v1.3 (14-Nov-2014) GUI_USBAUDIO: Added null check for template (SW00157864)
 v1.4 (10-Mar-2015) GUI_USBAUDIO: MY15 Robustness - Core issue #91 - Audiobooks does not work correctly (SW00162025)
 v1.5 (13-Mar-2015) GUI_USBAUDIO: "More Like This" shows English even in "BR-PT" selected (SW00161914)
 v1.6 (27-Mar-2015) [CMU MY15 - USB Audio][iPod]Saved Subtitle metadata from disconnected Umass device. (SW00160602); GUI_USBAUDIO: MoreLikeThis is missing. (SW00162390)
 v1.6.1 (27-May-2015) [CI-1873] [0501-J03A-53-007] Set "More Like This", but it's not stored by recovery condition (SW00164718) 
 v1.7 (07-Apr-2015) GUI_USBAUDIO: Modify to match the new  BLM_APPSDKUSBM prototype function changes  from BLM_APPSDKUSBM-MAZ140_00.09.000. (SW00163322)
 v1.8 (05-May-2015) GUI_USBAUDIO: App is setting UMP scrubber to invalid increment. (SW00164266)
 v1.9 (21-May-2015) GUI_USBAUDIO: Improve GUI USB Error handling in App SDK Callback (SW00165031)
 v2.0 (13-Aug-2015) GUI_USBAUDIO: Modify HMI to retrieve big lists of data directly from CPP_USBMS (SW00169231)
 v2.1 (02-Sep-2015) GUI_USBAUDIO: For long-press start/stop now sending Global events, instead of translating into FastForward, Rewind and Pause/Resume
 v2.2 (02-Sep-2015) GUI_USBAUDIO: [Japan_Testing][CI-2658]In spite of the Android Device, Root menu of Apple device was displayed
 v2.3 (25-Sep-2015) [USb Audio] Blank screen of metadata menu after browsing and playing tracks (SW00171596) and added check for _countAlbumsCallback and _countArtistsCallback if prop_info_list is empty (SW00165297)
 v2.4 (07-Oct-2015) [CI-2117] [0622-71E06-003] When user selects SONG-LIST and then goes to Album track list, last music track in list is highlighted.(SW00167068)
 v2.5 (09-Oct-2015) [USBAUDIO] When select MLT button for the first time, it doesn`t work correctly
 v2.6 (13-Oct-2015) [FQIR-3487] No tracks are displayed in More Like This in USB audio. Part II.
 v2.7 (15-Oct-2015) [USB Audio] Registered trademark symbol (®) doesn't appear correctly in the "Powered by Gracenote®" notification in Now playing screen (SW00172840)
 v2.8 (27-Oct-2015) [CI-2124] [0624-J71E06-001] All music tracks were not displayed when Song List folder was selected immediately after IG ON.(SW00167117)
 v2.9 (04-Nov-2015) [CMU MY15 - USB Audio] Total time is not set to zero on end of list.(SW00173913)
 v3.0 (05-Nov-2015) GUI_USBAUDIO: Fix for FQIR-3608, video 00040.zip.(SW00173978)
 v3.1 (13-Nov-2015) Added fix for repeat and shuffle state
 v3.2 (16-Nov-2015) [USBAUDIO] "Repeat" and "Shuffle" incorrect behavior(SW00174299)
 v3.3 (16-Nov-2015) [USBAUDIO] Empty "More Like This" list, when enter in "Song list"(SW00174291)
 v3.4 (16-Nov-2015) [GUI USB Audio] Artist menu is not openning before the Index List(Right-side alphabetical bar) is loaded(SW00174175)
 v3.5 (25-Nov-2015) [VR USB Audio]Wrong Track list after pressing Song list of opened track with VR command(SW00173848)
 v3.6 (02-Dec-2015) [Japan Bench][USB]When 'Audio Source' control/button selected control shifted back on 'Audio Source' only once.(SW00171652)
 Version v3.7 For Indeterminate Meter in Root menu is removed for this branch.
 v3.8 (05-Jan-2016) [CI-2913] Same list is displayed for multiple albums, with same album name by different artists(SW00171850)
 v3.9 (07-Jan-2016) [USBAUDIO]Same songs list is displayed for multiple playlists, with same playlist name(SW00175917)
 v4.0 (11-Jan-2016) Remove changes for SW00171850 and SW00175917 and add core fix for selecting item by id
 v4.1 (12-Jan-2016) Remove _composeId() and update logic in _equalValues()
 v4.2 (12-Jan-2016) GUI_USBAUDIO: clean up of ReleaseCoverart
 v4.2.1 (18-Feb-2016) USB Audio: Modify V61 component for integration in V58(SW00177375)
 v4.2.2 (30-Mar-2016) [FQIR-2745] Apple friendly name is not updated in Now Playing title(RTC 23279)
__________________________________________________________________________
 */
log.addSrcFile("usbaudioApp.js", "usbaudio");
//log.setLogLevel("usbaudio", "debug");

/**********************************************
 * Start of Base App Implementation
 *
 * Code in this section should not be modified
 * except for function names based on the appname
 *********************************************/

function usbaudioApp(uiaId)
{
    log.debug("constructor called...");

    // Base application functionality is provided in a common location via this call to baseApp.init().
    // See framework/js/BaseApp.js for details.
    baseApp.init(this, uiaId);

    // All feature-specific initialization is done in appInit()
}

/**************************
 * Standard App Functions *
 **************************/
/*
 * Called just after the app is instantiated by framework.
 */
usbaudioApp.prototype.appInit = function()
{
    log.debug(" usbaudioApp appInit  called...");

    if (framework.debugMode)
    {
        utility.loadScript("apps/usbaudio/test/usbaudioAppTest.js");
    }

    // CPP_USBMS enum BrowseCategory
    this._browseCategory = {
        USBMS_BROWSE_ALBUMS :                          0,
        USBMS_BROWSE_ALBUM_ARTIST :                    1,
        USBMS_BROWSE_ALBUM_ARTIST_SONGS :              2,
        USBMS_BROWSE_ALBUM_SONGS :                     3,
        USBMS_BROWSE_ALL_CONTENTS_IN_FOLDER :          4,
        USBMS_BROWSE_ALL_PLAYLISTS :                   5,
        USBMS_BROWSE_ALL_SONGS :                       6,
        USBMS_BROWSE_ALL_SUBFOLDER_ENTRIES_IN_FOLDER : 7,
        USBMS_BROWSE_ARTISTS :                         8,
        USBMS_BROWSE_ARTIST_ALBUMS :                   9,
        USBMS_BROWSE_ARTIST_ALBUM_SONGS :             10,
        USBMS_BROWSE_ARTIST_SONGS :                   11,
        USBMS_BROWSE_AUDIOBOOKS :                     12,
        USBMS_BROWSE_AUDIOBOOKS_CHAPTERS :            13,
        USBMS_BROWSE_GENRES :                         14,
        USBMS_BROWSE_GENRE_ALBUM :                    15,
        USBMS_BROWSE_GENRE_ALBUM_SONGS :              16,
        USBMS_BROWSE_GENRE_ARTISTS :                  17,
        USBMS_BROWSE_GENRE_ARTIST_ALBUM :             18,
        USBMS_BROWSE_GENRE_ARTIST_ALBUM_SONGS :       19,
        USBMS_BROWSE_GENRE_ARTIST_SONGS :             20,
        USBMS_BROWSE_GENRE_SONGS :                    21,
        USBMS_BROWSE_PLAYLIST_ENTRIES :               22,
        USBMS_BROWSE_PODCASTS :                       23,
        USBMS_BROWSE_PODCAST_SONGS :                  24,
        USBMS_BROWSE_MAX :                            25   // Enum border
    };

    // CPP_USBMS enum sortOrder
    this._sortOrder = {
        USBMS_SORT_NONE :         0,            // Items are not sorted
        USBMS_SORT_ALPHABETICAL : 1,            // Items are sorted alphabetically
        USBMS_SORT_TRACK_INDEX  : 2,            // Items are sorted by album track index
        USBMS_SORT_MAX :          3             // Enum border
    };

    // CPP_USBMS enum itemType
    this._itemType = {
        USBMS_ItemType_Unknown : 0,         // Invalid value
        USBMS_ItemType_Browsable : 1,       // Browsable item e.g. artist, album, folder
        USBMS_ItemType_PlayableFile : 2,    // Playable item
        USBMS_ItemType_NonPlayable : 3,     // Non-playable item e.g. text file, folder containing no playable files
        USBMS_ItemType_Max : 4,             // Max value of the enum
    };

    // CPP_USBMS objectId 
    this._objectId = {
        USBMS_ObjectID_Invalid: 2147483647  // 0x7FFFFFFF
    };
 
    // BLM metadata (md) filters
    this._mdFilter = {
        USBM_MetadataType_Unknown : 0,

        // String Types
        USBM_MetadataType_Storage : 1,              // Storage
        USBM_MetadataType_ObjectName : 2,           // Object (File) Title <String>, Chapter <String>
        USBM_MetadataType_GenreName : 3,            // Genre Table <String>
        USBM_MetadataType_AlbumName : 4,            // Album Table <String>, Audiobook Table <String>
        USBM_MetadataType_ArtistName : 5,           // Artist Table <String>
        USBM_MetadataType_PlaylistName : 6,         // Playlist Table <String>
        USBM_MetadataType_CategoryName : 7,         // library_category <String>
        USBM_MetadataType_ComposerName : 8,         // library_composer <String>

        // Numeric Types
        USBM_MetadataType_ObjectId : 9,             // Object (File) Id <Number>
        USBM_MetadataType_GenreId : 10,             // Genre Table <Number>
        USBM_MetadataType_AlbumId : 11,             // Album Table <Number>
        USBM_MetadataType_ArtistId : 12,            // Artist Table <Number>
        USBM_MetadataType_PlaylistId : 13,          // Playlist Table <Number>
        USBM_MetadataType_CategoryId : 14,          // library_category <Number>
        USBM_MetadataType_ComposerId : 15,          // library_composer <Number>
        USBM_MetadataType_ObjectFolderId : 16,      // Folder Id

        // Object Audio Info
        USBM_MetadataType_ObjectFileName : 17,      //library table (Object table) <String>
        USBM_MetadataType_ObjectFolderName : 18,    // folders table <String>
        USBM_MetadataType_Duration : 19,            // library table (Object table) <Number>
        USBM_MetadataType_BitRate : 20,             // library table (Object table) <Number> - bitrate, in [bits/sec]
        USBM_MetadataType_SampleRate : 21,          // library table (Object table) <Number> - sample rate of decoded stream, in [Hz]
        USBM_MetadataType_ChannelsCnt : 22,         // library table (Object table) <Number>
        USBM_MetadataType_MediaFormat : 23,         // library table (Object table) <Number> - MME_FORMAT_*
        // TBD:
        USBM_MetadataType_Kind : 24,                // Music, Audiobooks, Podcast episodes
        USBM_MetadataType_AlbumOrder : 25,          // Track Album Index
        USBM_MetadataType_Podcast : 26,             // Podcast name

        USBM_MetadataType_Max : 27
    };

    this._currentContextId = null;
	// BLM sort order (so) filters
    this._soFilter = {
        USBM_SortOrder_Raw : 0,
        USBM_SortOrder_AlphaAscending : 1,
        USBM_SortOrder_AlphaDescending : 2,
        USBM_SortOrder_AlphaNumericAscending : 3,
        USBM_SortOrder_AlphaNumericDescending : 4
    };

    this._payloadTable = {
        AllGenres: {
            hasLineNumbers: false,
            hasLetterIndexing: false,
            checkValues: false,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_GenreName],
            md_info: {
                genre: {
                    value: "Genres",
                    type: this._mdFilter.USBM_MetadataType_Unknown,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_GenreName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "Genres",
        },
        AllArtists: {
            hasLineNumbers: false,
            hasLetterIndexing: true,
            checkValues: false,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ArtistName],
            md_info: {
                artist: {
                    value: "Artist",
                    type: this._mdFilter.USBM_MetadataType_Unknown,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ArtistName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "Artists",
        },
        AllAlbums: {
            hasLineNumbers: false,
            hasLetterIndexing: true,
            checkValues: false,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_AlbumName],
            md_info: {
                album: {
                    value: "Album",
                    type: this._mdFilter.USBM_MetadataType_Unknown,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "Albums",
        },
        AllSongs: {
            hasLineNumbers: true,
            hasLetterIndexing: true,
            checkValues: false,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                song: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_Unknown,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "Songs",
        },
        AllPlaylists: {
            hasLineNumbers: false,
            hasLetterIndexing: false,
            checkValues: false,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_PlaylistName],
            md_info: {
                playlist: {
                    value: "Playlists",
                    type: this._mdFilter.USBM_MetadataType_Unknown,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_PlaylistName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "Playlists",
        },
        PlaylistSongs: {
            hasLineNumbers: true,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                playlist: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_PlaylistName,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "playlistName",
        },
        GenreArtists: {
            hasLineNumbers: false,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ArtistName],
            md_info: {
                genre: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_GenreName,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ArtistName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "genreName",
        },
        GenresAllArtists: {
            hasLineNumbers: false,
            hasLetterIndexing: true,
            checkValues: false,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ArtistName],
            md_info: {
                artist: {
                    value: "Artist",
                    type: this._mdFilter.USBM_MetadataType_Unknown,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ArtistName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "allArtists",
        },
        Genre_AllAlbums: {
            hasLineNumbers: false,
            hasLetterIndexing: true,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_AlbumName],
            md_info: {
                genre: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_GenreName,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "genreName",
        },
        Genre_ArtistAlbums: {
            hasLineNumbers: false,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_AlbumName],
            md_info: {
                genre: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_GenreName,
                    id: 0,
                },
                artist: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_ArtistName,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "artistName",
        },
        GenresAllArtists_ArtistAlbums: {
            hasLineNumbers: false,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_AlbumName],
            md_info: {
                artist: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_ArtistName,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "artistName",
        },
        GenresAllArtists_AllAlbums: {
            hasLineNumbers: false,
            hasLetterIndexing: true,
            checkValues: false,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_AlbumName],
            md_info: {
                album: {
                    value: "Album",
                    type: this._mdFilter.USBM_MetadataType_Unknown,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "allAlbums",
        },
        ArtistAlbums: {
            hasLineNumbers: false,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_AlbumName],
            md_info: {
                artist: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_ArtistName,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "artistName",
        },
        AllArtistsAllAlbums: {
            hasLineNumbers: false,
            hasLetterIndexing: true,
            checkValues: false,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_AlbumName],
            md_info: {
                album: {
                    value: "Album",
                    type: this._mdFilter.USBM_MetadataType_Unknown,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "allAlbums",
        },
        AlbumSongs: {
            hasLineNumbers: false,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                album: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_AlbumName,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumOrder, sort_order: this._soFilter.USBM_SortOrder_AlphaNumericAscending}],
            titleConfig: "albumName",
        },
        AlbumsAllSongs: {
            hasLineNumbers: false,
            hasLetterIndexing: true,
            checkValues: false,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                song: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_Unknown,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "allSongs",
        },
        AlbumsDisambiguate: {
            hasLineNumbers: true,
            hasLetterIndexing: true,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                album: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_AlbumName,
                    id: 0,
                },
                artist: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_ArtistName,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "albumName",
        },
        AlbumsDisambiguateSongs: {
            hasLineNumbers: false,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                album: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_AlbumName,
                    id: 0,
                },
                artist: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_ArtistName,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "albumName",
        },
        Artist_AlbumSongs: {
            hasLineNumbers: true,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                artist: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_ArtistName,
                    id: 0,
                },
                album: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_AlbumName,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumOrder, sort_order: this._soFilter.USBM_SortOrder_AlphaNumericAscending}],
            titleConfig: "albumName",
        },
        Artist_AllSongs: {
            hasLineNumbers: true,
            hasLetterIndexing: true,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                artist: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_ArtistName,
                    id: 0,
                },
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "artistName",
        },
        Artist_OneAlbumSongs: {
            hasLineNumbers: true,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                album: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_AlbumName,
                    id: 0,
                },
                artist: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_ArtistName,
                    id: 0,
                },
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumOrder, sort_order: this._soFilter.USBM_SortOrder_AlphaNumericAscending}],
            titleConfig: "artistName",
        },
        ArtistsAllAlbums_AlbumSongs: {
            hasLineNumbers: true,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                album: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_AlbumName,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumOrder, sort_order: this._soFilter.USBM_SortOrder_AlphaNumericAscending}],
            titleConfig: "albumName",
        },
        ArtistsAllAlbums_AllSongs :{
            hasLineNumbers: true,
            hasLetterIndexing: true,
            checkValues: false,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                song: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_Unknown,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "allSongs",
        },
        Genre_Artist_AlbumSongs: {
            hasLineNumbers: true,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                album: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_AlbumName,
                    id: 0,
                },
                artist: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_ArtistName,
                    id: 0,
                },
                genre: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_GenreName,
                    id: 0,
                },
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumOrder, sort_order: this._soFilter.USBM_SortOrder_AlphaNumericAscending}],
            titleConfig: "albumName",
        },
        Genre_Artist_AllSongs: {
            hasLineNumbers: false,
            hasLetterIndexing: true,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                artist: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_ArtistName,
                    id: 0,
                },
                genre: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_GenreName,
                    id: 0,
                },
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "artistName",
        },
        Genre_Artist_OneAlbumSongs: {
            hasLineNumbers: true,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                artist: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_ArtistName,
                    id: 0,
                },
                genre: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_GenreName,
                    id: 0,
                },
                album: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_AlbumName,
                    id: 0,
                },
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "artistName",
        },
        Genre_AllAlbums_AlbumSongs: {
            hasLineNumbers: true,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                genre: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_GenreName,
                    id: 0,
                },
                album: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_AlbumName,
                    id: 0,
                },
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumOrder, sort_order: this._soFilter.USBM_SortOrder_AlphaNumericAscending}],
            titleConfig: "albumName",
        },
        Genre_AllAlbums_AllSongs: {
            hasLineNumbers: true,
            hasLetterIndexing: true,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                genre: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_GenreName,
                    id: 0,
                },
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "genreName",
        },
        GenresAllArtists_Artist_AlbumSongs: {
            hasLineNumbers: true,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                artist: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_ArtistName,
                    id: 0,
                },
                album: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_AlbumName,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumOrder, sort_order: this._soFilter.USBM_SortOrder_AlphaNumericAscending}],
            titleConfig: "albumName",
        },
        GenresAllArtists_Artist_AllSongs: {
            hasLineNumbers: true,
            hasLetterIndexing: true,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                artist: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_ArtistName,
                    id: 0,
                },
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "artistName",
        },
        GenresAllArtists_Artist_OneAlbumSongs: {
            hasLineNumbers: true,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                album: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_AlbumName,
                    id: 0,
                },
                artist: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_ArtistName,
                    id: 0,
                },
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumOrder, sort_order: this._soFilter.USBM_SortOrder_AlphaNumericAscending}],
            titleConfig: "artistName",
        },
        GenresAllArtists_AllAlbums_AlbumSongs: {
            hasLineNumbers: false,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                album: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_AlbumName,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumOrder, sort_order: this._soFilter.USBM_SortOrder_AlphaNumericAscending}],
            titleConfig: "albumName",
        },
        GenresAllArtists_AllAlbums_AllSongs: {
            hasLineNumbers: false,
            hasLetterIndexing: true,
            checkValues: false,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                song: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_Unknown,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "allSongs",
        },
        FolderSongs: {
            hasLineNumbers: true,
            hasLetterIndexing: false,
            checkValues: false,
            index: 0,
            focused: 0,
            currentFolderName: "",
            foldersPath: [],
            browsingStarted: false,
            images: ["", "common/images/icons/IcnListFolder.png", "", "common/images/icons/IcnListSong.png"],
            disabled: [true, false, false, true, true],
        },
        FolderAllSongs: {
            hasLineNumbers: true,
            hasLetterIndexing: false,
            checkValues: false,
            index: 0,
            focused: 0,
            name: null,
        },
        MoreLikeThisSongs: {
            hasLineNumbers: false,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                song: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_Unknown,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
        },
        Podcasts: {
            hasLineNumbers: false,
            hasLetterIndexing: true,
            checkValues: false,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_Podcast],
            md_info: {
                podcast: {
                    value: "Podcast",
                    type: this._mdFilter.USBM_MetadataType_Unknown,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_Podcast, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "Podcasts",
        },
        PodcastEpisodes: {
            hasLineNumbers: false,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                podcast: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_Podcast,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "podcastName",
        },
        Audiobooks: {
            hasLineNumbers: false,
            hasLetterIndexing: true,
            checkValues: false,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_Kind],
            md_info: {
                audiobook: {
                    value: "Audiobook",
                    type: this._mdFilter.USBM_MetadataType_Kind,
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_Kind, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "Audiobooks",
        },
        AudiobookChapters: {
            hasLineNumbers: false,
            hasLetterIndexing: false,
            checkValues: true,
            index: 0,
            focused: 0,
            md_types: [this._mdFilter.USBM_MetadataType_ObjectName],
            md_info: {
                audiobook: {
                    value: "",
                    type: this._mdFilter.USBM_MetadataType_Kind,                   
                    id: 0,
                }
            },
            sort_settings: [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}],
            titleConfig: "audiobookName",
        },
        Invalid: {
            index: 0,
            focused: 0,
            name: null,
        }
    };

    this._browsingTable = {
        AllGenres: {
            idLevel1: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_GENRES,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        AllArtists: {
            idLevel1: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ARTISTS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        AllAlbums: {
            idLevel1: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALBUMS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        AllSongs: {
            idLevel1: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALL_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        AllPlaylists: {
            idLevel1: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALL_PLAYLISTS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        PlaylistSongs: {
            idLevel1: {
                name: "playlist",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_PLAYLIST_ENTRIES,
            sortOrder: this._sortOrder.USBMS_SORT_NONE
        },
        GenreArtists: {
            idLevel1: {
                name: "genre",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_GENRE_ARTISTS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        GenresAllArtists: {
            idLevel1: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ARTISTS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        Genre_AllAlbums: {
            idLevel1: {
                name: "genre",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_GENRE_ALBUM,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        Genre_ArtistAlbums: {
            idLevel1: {
                name: "genre",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "artist",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_GENRE_ARTIST_ALBUM,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        GenresAllArtists_ArtistAlbums: {
            idLevel1: {
                name: "artist",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ARTIST_ALBUMS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        GenresAllArtists_AllAlbums: {
            idLevel1: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALBUMS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        ArtistAlbums: {
            idLevel1: {
                name: "artist",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ARTIST_ALBUMS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        AllArtistsAllAlbums: {
            idLevel1: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALBUMS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        AlbumSongs: {
            idLevel1: {
                name: "album",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALBUM_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_TRACK_INDEX
        },
        AlbumsAllSongs: {
            idLevel1: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALL_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        AlbumsDisambiguate: {
            idLevel1: {
                name: "album",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALBUM_ARTIST,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        AlbumsDisambiguateSongs: {
            idLevel1: {
                name: "album",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "artist",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALBUM_ARTIST_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        Artist_AlbumSongs: {
            idLevel1: {
                name: "artist",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "album",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ARTIST_ALBUM_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_TRACK_INDEX
        },
        Artist_AllSongs: {
            idLevel1: {
                name: "artist",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ARTIST_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        Artist_OneAlbumSongs: {
            idLevel1: {
                name: "artist",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "album",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ARTIST_ALBUM_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_TRACK_INDEX
        },
        ArtistsAllAlbums_AlbumSongs: {
            idLevel1: {
                name: "album",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALBUM_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_TRACK_INDEX
        },
        ArtistsAllAlbums_AllSongs :{
            idLevel1: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALL_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        Genre_Artist_AlbumSongs: {
            idLevel1: {
                name: "genre",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "artist",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "album",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_GENRE_ARTIST_ALBUM_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_TRACK_INDEX
        },
        Genre_Artist_AllSongs: {
            idLevel1: {
                name: "genre",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "artist",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_GENRE_ARTIST_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        Genre_Artist_OneAlbumSongs: {
            idLevel1: {
                name: "genre",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "artist",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "album",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_GENRE_ARTIST_ALBUM_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_TRACK_INDEX
        },
        Genre_AllAlbums_AlbumSongs: {
            idLevel1: {
                name: "genre",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "album",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_GENRE_ALBUM_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_TRACK_INDEX
        },
        Genre_AllAlbums_AllSongs: {
            idLevel1: {
                name: "genre",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_GENRE_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        GenresAllArtists_Artist_AlbumSongs: {
            idLevel1: {
                name: "artist",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "album",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ARTIST_ALBUM_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_TRACK_INDEX
        },
        GenresAllArtists_Artist_AllSongs: {
            idLevel1: {
                name: "artist",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ARTIST_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        GenresAllArtists_Artist_OneAlbumSongs: {
            idLevel1: {
                name: "artist",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "album",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ARTIST_ALBUM_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_TRACK_INDEX
        },
        GenresAllArtists_AllAlbums_AlbumSongs: {
            idLevel1: {
                name: "album",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALBUM_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_TRACK_INDEX
        },
        GenresAllArtists_AllAlbums_AllSongs: {
            idLevel1: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALL_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        FolderSongs: {
            idLevel1: {
                name: "folderId",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALL_CONTENTS_IN_FOLDER,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        FolderAllSongs: {
            idLevel1: {
                name: "folderId",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALL_SUBFOLDER_ENTRIES_IN_FOLDER,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        MoreLikeThisSongs: {
            idLevel1: {
                name: "song",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_PLAYLIST_ENTRIES,
            sortOrder: this._sortOrder.USBMS_SORT_NONE
        },
        Podcasts: {
            idLevel1: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_PODCASTS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        PodcastEpisodes: {
            idLevel1: {
                name: "podcast",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_PODCAST_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_NONE
        },
        Audiobooks: {
            idLevel1: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_AUDIOBOOKS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        },
        AudiobookChapters: {
            idLevel1: {
                name: "audiobook",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_AUDIOBOOKS_CHAPTERS,
            sortOrder: this._sortOrder.USBMS_SORT_NONE
        },
        Invalid: {
            idLevel1: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel2: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            idLevel3: {
                name: "",
                id: this._objectId.USBMS_ObjectID_Invalid,
            },
            browseCategory: this._browseCategory.USBMS_BROWSE_ALL_SONGS,
            sortOrder: this._sortOrder.USBMS_SORT_ALPHABETICAL
        }
    };

    this._usbaudioErrorSbn = "UsbaudioError";
    this._topItemOptions =
    {
        setTopItem: false,
        top: null,
        focus: null,
    };

    this._cachedSongDetails = {
        screenTitle: null,
        genre: null,
        artist: null,
        title: null,
        album: null,
        coverArt: "None"
    };

    this._trackInfo = {
        trackId: this._objectId.USBMS_ObjectID_Invalid,
        trackIdOffSetInList: this._objectId.USBMS_ObjectID_Invalid
    };

    this._currentTotalCount = 0;

    this._listStatus = {
        requestSize: 20,
        cachedList: null,
    };

    this._connectedDevs = {
        selId: 0,
        deviceSelected: 0,
        selectedDevType: "",
        playbackReady: false,
        folderBrowsingPossible: false,
        mdBrowsingPossible: false,
        mltPossible: false,
        endOfListState: false,
        songListCategory: "",
        showGracenote: true,
        RepeatShuffleReady: false,
        connectionReason : null,
        A:{
            name: "",
            id: 0,
            deviceId: 0,
            type: null,
            playbackReady: false,
            folderBrowsingPossible: false,
            mdBrowsingPossible: false,
            mltPossible: false,
            endOfListState: false,
            songListCategory: "",
            showGracenote: true,
        	RepeatShuffleReady: false,
			currentlyFocussedButton: "source",
            connectionReason : "User",
        },
        B: {
            name: "",
            id: 0,
            deviceId: 0,
            type: null,
            playbackReady: false,
            folderBrowsingPossible: false,
            mdBrowsingPossible: false,
            mltPossible: false,
            endOfListState: false,
            songListCategory: "",
            showGracenote: true,
        	RepeatShuffleReady: false,
			currentlyFocussedButton: "source",
            connectionReason : "User",
        },
    };

    this._viewType = {
        tree: 1,
        list:2
    };

    this._gracenoteTimeout = null;
    this._gracenoteTimeoutTime = 3000;
    this._umpElapseTime = 0;
    this._umpTotalTime = 0;
    this._userIntent = "Browse";
    this._rootFolderId = 1;
    this._umpProgressValue = 0;
    this._stopElapsedUpdate = false;
    this._umpSecondaryElapseTime = 0;
    this._settleTime = 500;
    this._finalAdjustmentTimeout = null;

    this._umpButtonConfig = new Object();

    // UMP Default config
    var selectCallback = this._umpDefaultSelectCallback.bind(this);//selectCallback make sure that function is called whenever the control is selected (either via Multicontroller or touch)
    var holdStartCallback = this._umpHoldStartCallback.bind(this);
    var holdStopCallback = this._umpHoldStopCallback.bind(this);
    var slideCallback = this._umpSlideCallback.bind(this);
    //@formatter:off
    this._scrubberConfig = {
        "scrubberStyle": "Style01",
        "mode" : "slider",
        "hasActiveState" : true,
        "value" : 0,
        "min" : 0.0,
        "max" : 1.0,
        "increment" : 0.01,
        "currentValue" : 0,
        "minChangeInterval" : 250,
        "settleTime" : 1000,
        "slideCallback": slideCallback,
        "appData" : "scrubber",
        "elapsedTime" : "00:00",
        "totalTime" : "00:00",
        "disabled" : false,
        "buffering" : false,
        "duration": 0,
    };

    this._umpConfig =
    {
        hasScrubber                 : true,
        retracted                   : false,
        tooltipsEnabled             : true,
        defaultHoldStartCallback    : this._umpHoldStartCallback,
        defaultHoldStopCallback     : this._umpHoldStopCallback,
        defaultSlideCallback        : this._umpSlideCallback,
        defaultFocusCallback        : this._umpFocusCallback.bind(this),
        initialButtonFocus          : "source",
        buttonConfig                : this._umpButtonConfig,
        scrubberConfig              : this._scrubberConfig
    };

    this._umpButtonConfig["source"] =
    {
        buttonBehavior : "shortPressOnly",
        disabled : false,
        imageBase : "IcnUmpEntMenu",
        appData : "source",
        label : null,
        selectCallback: selectCallback
    };

    this._umpButtonConfig["BrowseFolders"] =
    {
        buttonBehavior : "shortPressOnly",
        disabled : false,
        imageBase : "IcnUmpCurrentList",
        appData : "BrowseFolders",
        labelId : "RootMenu",
        selectCallback: selectCallback
    };

    this._umpButtonConfig["SongList"] =
    {
        buttonBehavior : "shortPressOnly",
        disabled : false,
        imageBase : "IcnUmpTopList",
        appData : "SongList",
        labelId : "Tooltip_IcnUmpCurrentList",
        selectCallback: selectCallback
    };

    this._umpButtonConfig["repeat"] =
    {
        buttonBehavior : "shortPressOnly",
        imageBase : "./apps/usbaudio/images/IcnUmpRepeat",
        currentState:"List",
        stateArray: [
            {
                state:"Song", labelId : "common.Tooltip_IcnUmpRepeat_Song",
            },
            {
                state:"List", labelId : "common.Tooltip_IcnUmpRepeat_List",
            },
            {
                state:"None", labelId : "common.Tooltip_IcnUmpRepeat_None",
            }
        ],
        disabled : false,
        appData:"repeat",
        autoStateChange :   "false",
        selectCallback: selectCallback
    };

    this._umpButtonConfig["shuffle"] =
    {
        buttonBehavior : "shortPressOnly",
        imageBase : "IcnUmpShuffle",
        currentState:"Off",
        stateArray: [
            {
                state:"Off", label: null
            },
            {
                state:"On", label: null
            }
        ],
        disabled : false,
        appData:"shuffle",
        autoStateChange :   "false",
        selectCallback: selectCallback
    };

    this._umpButtonConfig["GenerateMoreLikeThis"] =
    {
        buttonBehavior : "shortPressOnly",
        disabled : false,
        imageBase : "IcnUmpMore",
        appData : "GenerateMoreLikeThis",
        labelId : "common.Tooltip_IcnUmpMore",
        selectCallback: selectCallback
    };

    this._umpButtonConfig["prev"] =
    {
        buttonBehavior : "shortAndHold",
        imageBase : "IcnUmpPreviousAudio",
        disabled : false,
        appData : "prev",
        label : null,
        selectCallback: selectCallback,
        holdStartCallback : holdStartCallback,
        holdStopCallback : holdStopCallback
    };

    this._umpButtonConfig["playpause"] =
    {
        buttonBehavior : "shortPressOnly",
        imageBase : "IcnUmpPlayPause",
        currentState:"Pause",
        stateArray: [
            {
                state:"Play", label:null
            },
            {
                state:"Pause", label:null
            },

        ],
        disabled : false,
        appData : "playpause",
        autoStateChange :   "false",
        selectCallback: selectCallback
    };

    this._umpButtonConfig["next"] =
    {
        buttonBehavior : "shortAndHold",
        imageBase : "IcnUmpNextAudio",
        disabled : false,
        appData : "next",
        label : null,
        selectCallback: selectCallback,
        holdStartCallback : holdStartCallback,
        holdStopCallback : holdStopCallback
    };

    this._umpButtonConfig["settings"] =
    {
        buttonBehavior : "shortPressOnly",
        disabled : false,
        imageBase : "IcnUmpEqualizer",
        appData : "settings",
        label : null,
        selectCallback: selectCallback
    };

    //@formatter:on
    this._usbaudioCtxtDataList = {
        itemCountKnown : true,
        itemCount : 8,
        vuiSupport: true,
        items: [
            // Note: appData values here are the EventIds that will be sent to MMUI on item selection
            { appData : 'BrowsePlaylists', text1Id : 'Playlist', itemStyle : 'style01', disabled: true, hasCaret: false },
            { appData : 'BrowseArtists', text1Id : 'Artist', itemStyle : 'style01', disabled: true, hasCaret: false },
            { appData : 'BrowseAlbums', text1Id : 'Album', itemStyle : 'style01', disabled: true, hasCaret: false },
            { appData : 'BrowseSongs', text1Id : 'Song', itemStyle : 'style01', disabled: true, hasCaret: false },
            { appData : 'BrowseGenres', text1Id : 'Genre', itemStyle : 'style01', disabled: true, hasCaret: false },
            { appData : 'BrowseAudiobooks', text1Id : 'Audiobook', itemStyle : 'style01', disabled: true, hasCaret: false },
            { appData : 'BrowsePodcasts', text1Id : 'Podcast', itemStyle : 'style01', disabled: true, hasCaret: false },
            { appData : 'BrowseFolders', text1Id : 'Folder', itemStyle : 'style01', hasCaret: false }
        ]
    };

    var loadingDataList = {
        itemCountKnown : false,
        itemCount : -1,
        items : []
    };

    //@formatter:off
    /**table with all context in USBAUDIO*/
    this._contextTable = {

        "USBAudio" : {
            "template" : "List2Tmplt",
            "sbNameId": this.uiaId,
            "sbNameSubMap": {deviceName: this._connectedDevs.A},
            leftBtnStyle : "menuUp",
            "controlProperties": {
                "List2Ctrl" : {
                    dataList: this._usbaudioCtxtDataList,
                    numberedList: true,
                    titleConfiguration : 'listTitle',
                    title : {
                        text1Id : 'RootMenu',
                        titleStyle : 'style02'
                    },
                    scrollTo: 0,
                    focussedItem: 0,
                    selectCallback : this._listItemClickCallback.bind(this),
                } // end of properties for "ListCtrl"
            }, // end of list of controlProperties
            "contextOutFunction": this._USBAudioCtxtOut.bind(this),
        }, // end of "USBAudio"

        "Playlists" : {
            "template" : "List2Tmplt",
            "sbNameId": this.uiaId,
            "sbNameSubMap": {deviceName: this._connectedDevs.A},
            leftBtnStyle : "menuUp",
            "controlProperties": {
                "List2Ctrl" : {
                    numberedList: true,
                    dataList: loadingDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        text1Id : 'Playlists',
                        titleStyle : 'style02'
                    },
                    hideLoadingOverlayTimeout: 0,
                    selectCallback : this._listItemClickCallback.bind(this),
                    needDataCallback : this._requestMoreDataCallback.bind(this)
                } // end of properties for "ListCtrl"
            }, // end of list of controlProperties
            "contextInFunction" : this._PlaylistsCtxtContextIn.bind(this),
            "readyFunction": this._PlaylistsContextReady.bind(this),
            "contextOutFunction" : this._PlaylistsCtxtContextOut.bind(this),
        }, // end of "Playlists"

        "Podcasts" : {
            "template" : "List2Tmplt",
            "sbNameId": this.uiaId,
            "sbNameSubMap": {deviceName: this._connectedDevs.A},
            leftBtnStyle : "menuUp",
            "controlProperties": {
                "List2Ctrl" : {
                    numberedList: true,
                    dataList: loadingDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        text1Id : 'Podcasts',
                        titleStyle : 'style02'
                    },
                    hideLoadingOverlayTimeout: 0,
                    selectCallback : this._listItemClickCallback.bind(this),
                    needDataCallback : this._requestMoreDataCallback.bind(this)
                } // end of properties for "ListCtrl"
            }, // end of list of controlProperties
            "contextInFunction" : this._PodcastsCtxtContextIn.bind(this),
            "readyFunction": this._PodcastsContextReady.bind(this),
            "contextOutFunction" : this._PodcastsCtxtContextOut.bind(this),
        }, // end of "Podcast"

        "Audiobooks" : {
            "template" : "List2Tmplt",
            "sbNameId": this.uiaId,
            "sbNameSubMap": {deviceName: this._connectedDevs.A},
            leftBtnStyle : "menuUp",
            "controlProperties": {
                "List2Ctrl" : {
                    numberedList: true,
                    dataList: loadingDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        text1Id : 'Audiobooks',
                        titleStyle : 'style02'
                    },
                    hideLoadingOverlayTimeout: 0,
                    selectCallback : this._listItemClickCallback.bind(this),
                    needDataCallback : this._requestMoreDataCallback.bind(this)
                } // end of properties for "ListCtrl"
            }, // end of list of controlProperties
            "contextInFunction" : this._AudiobooksCtxtContextIn.bind(this),
            "readyFunction": this._AudiobooksContextReady.bind(this),
            "contextOutFunction" : this._AudiobooksCtxtContextOut.bind(this),
        }, // end of "Audiobooks"

        "Episodes" : {
            "template" : "List2Tmplt",
            "sbNameId": this.uiaId,
            "sbNameSubMap": {deviceName: this._connectedDevs.A},
            leftBtnStyle : "menuUp",
            "controlProperties": {
                "List2Ctrl" : {
                    numberedList: true,
                    dataList: loadingDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        // text1Id : 'Episodes',
                        titleStyle : 'style02'
                    },
                    hideLoadingOverlayTimeout: 0,
                    selectCallback : this._listItemClickCallback.bind(this),
                    needDataCallback : this._requestMoreDataCallback.bind(this)
                } // end of properties for "ListCtrl"
            }, // end of list of controlProperties
            "contextInFunction" : this._EpisodesCtxtContextIn.bind(this),
            "readyFunction": this._EpisodesContextReady.bind(this),
            "contextOutFunction": this._EpisodesCtxtContextOut.bind(this)
        }, // end of "Episodes"

        "Chapters" : {
            "template" : "List2Tmplt",
            "sbNameId": this.uiaId,
            "sbNameSubMap": {deviceName: this._connectedDevs.A},
            leftBtnStyle : "menuUp",
            "controlProperties": {
                "List2Ctrl" : {
                    numberedList: true,
                    dataList: loadingDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        // text1Id : 'Chapters',
                        titleStyle : 'style02'
                    },
                    hideLoadingOverlayTimeout: 0,
                    selectCallback : this._listItemClickCallback.bind(this),
                    needDataCallback : this._requestMoreDataCallback.bind(this)
                } // end of properties for "ListCtrl"
            }, // end of list of controlProperties
            "contextInFunction" : this._ChaptersCtxtContextIn.bind(this),
            "readyFunction": this._ChaptersContextReady.bind(this),
            "contextOutFunction": this._ChaptersCtxtContextOut.bind(this),
         }, // end of "Chapters"

        "Genres" : {
            "template" : "List2Tmplt",
            "sbNameId": this.uiaId,
            "sbNameSubMap": {deviceName: this._connectedDevs.A},
            leftBtnStyle : "menuUp",
            "controlProperties": {
                "List2Ctrl" : {
                    numberedList: true,
                    dataList: loadingDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        text1Id : 'Genres',
                        titleStyle : 'style02'
                    },
                    hideLoadingOverlayTimeout: 0,
                    selectCallback : this._listItemClickCallback.bind(this),
                    needDataCallback : this._requestMoreDataCallback.bind(this)
                } // end of properties for "ListCtrl"
            }, // end of list of controlProperties
            "contextInFunction" : this._GenresCtxtContextIn.bind(this),
            "readyFunction": this._GenresContextReady.bind(this),
            "contextOutFunction": this._GenresCtxtContextOut.bind(this)
        }, // end of "Genres"

        "Artists" : {
            "template" : "List2Tmplt",
            "sbNameId": this.uiaId,
            "sbNameSubMap": {deviceName: this._connectedDevs.A},
            leftBtnStyle : "menuUp",
            "controlProperties": {
                "List2Ctrl" : {
                    numberedList: true,
                    dataList: loadingDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        text1Id : 'Artists',
                        titleStyle : 'style02'
                    },
                    hideLoadingOverlayTimeout: 0,
                    scrollTo : 0,
                    selectCallback : this._listItemClickCallback.bind(this),
                    needDataCallback : this._requestMoreDataCallback.bind(this)
                } // end of properties for "ListCtrl"
            }, // end of list of controlProperties
            "contextInFunction": this._ArtistsCtxtContextIn.bind(this),
            "readyFunction": this._ArtistsContextReady.bind(this),
            "contextOutFunction" : this._ArtistsCtxtContextOut.bind(this),
        }, // end of "Artists"

        "Albums" : {
            "template" : "List2Tmplt",
            "sbNameId": this.uiaId,
            "sbNameSubMap": {deviceName: this._connectedDevs.A},
            leftBtnStyle : "menuUp",
            "controlProperties": {
                "List2Ctrl" : {
                    numberedList: true,
                    dataList: loadingDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        text1Id : 'Albums',
                        titleStyle : 'style02'
                    },
                    hideLoadingOverlayTimeout: 0,
                    scrollTo : 0,
                    selectCallback : this._listItemClickCallback.bind(this),
                    needDataCallback : this._requestMoreDataCallback.bind(this)
                } // end of properties for "ListCtrl"
            }, // end of list of controlProperties
            "contextInFunction": this._AlbumsCtxtContextIn.bind(this),
            "readyFunction": this._AlbumsContextReady.bind(this),
            "contextOutFunction" : this._AlbumsCtxtContextOut.bind(this)
        }, // end of "Albums"

        "Songs" : {
            "template" : "List2Tmplt",
            "sbNameId": this.uiaId,
            "sbNameSubMap": {deviceName: this._connectedDevs.A},
            leftBtnStyle : "menuUp",
            "controlProperties": {
                "List2Ctrl" : {
                    numberedList: true,
                    requestSize: 20,
                    dataList: loadingDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',
                        text1Id: "AllSongs"
                    },
                    hideLoadingOverlayTimeout: 0,
                    scrollTo : 0,
                    selectCallback : this._listItemClickCallback.bind(this),
                    needDataCallback : this._requestMoreDataCallback.bind(this)
                } // end of properties for "ListCtrl"
            }, // end of list of controlProperties
            "contextInFunction": this._SongsCtxtContextIn.bind(this),
            "readyFunction": this._SongsContextReady.bind(this),
            "contextOutFunction" : this._SongsCtxtContextOut.bind(this),
        }, // end of "Songs"

        "Folders" : {
            "template" : "List2Tmplt",
            "sbNameId": this.uiaId,
            "sbNameSubMap": {deviceName: this._connectedDevs.A},
            leftBtnStyle : "menuUp",
            "controlProperties": {
                "List2Ctrl" : {
                    numberedList: true,
                    requestSize: 20,
                    dataList: loadingDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',
                        text1Id: "",
                        title1SubMap: null,
                        title: "",
                    },
                    hideLoadingOverlayTimeout: 0,
                    scrollTo : 0,
                    selectCallback : this._listItemClickCallback.bind(this),
                    needDataCallback : this._requestMoreDataCallback.bind(this)
                } // end of properties for "ListCtrl"
            }, // end of list of controlProperties
            "readyFunction": this._FoldersContextReady.bind(this),
        }, // end of "Folders"

        "NowPlaying" : {
            "template" : "NowPlaying4Tmplt",
            "sbNameId": this.uiaId,
            "controlProperties": {
                "NowPlayingCtrl" : {
                    "ctrlStyle": "Style2",
                    "umpConfig" : this._umpConfig,
                } // end of properties for "NowPlayingCtrl"
            }, // end of list of controlProperties
            "readyFunction" : this._NowPlayingCtxtReadyToDisplay.bind(this),
            "contextOutFunction": this._NowPlayingCtxtContextOut.bind(this)
        }, // end of "NowPlaying"

        "ErrorCondition" : {
            "template" : "Dialog3Tmplt",
            "sbNameId": this.uiaId,
            "controlProperties": {
                "Dialog3Ctrl" : {
                    "defaultSelectCallback" : this._dialogDefaultSelectCallback.bind(this),
                    "contentStyle" : "style02",
                    "fullScreen" : false,
                    "buttonCount" : 1,
                    "buttonConfig" : {
                        "button1" : {
                            buttonColor: "normal",
                            buttonBehavior : "shortPressOnly",
                            labelId: "common.Ok",
                            appData : "Global.OK", /**Global. Events are sent from GUI to MMUI and the uiaId argument is always "Common"*/
                            disabled : false
                        },
                    }, // end of buttonConfig
                    "text1Id" : null,
                } // end of properties for "ErrorCondition"
            }, // end of list of controlProperties
            "contextInFunction": this._ErrorConditionCtxtIn.bind(this),
            "readyFunction" : this._ErrorConditionCtxtReadyToDisplay.bind(this),
        }, // end of "ErrorCondition"

		//when there are artists with same albums
        "AlbumBrowseDisambiguation": {
            "template" : "List2Tmplt",
            "sbNameId": this.uiaId,
            "sbNameSubMap": {deviceName: this._connectedDevs.A},
            "controlProperties": {
                "List2Ctrl" : {
                    numberedList: true,
                    requestSize: 20,
                    dataList: loadingDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',
                        text1Id: "Albums"
                    },
                    hideLoadingOverlayTimeout: 0,
                    scrollTo : 0,
                    selectCallback : this._listItemClickCallback.bind(this),
                    needDataCallback : this._requestMoreDataCallback.bind(this)
                } // end of properties for "ListCtrl"
            }, // end of list of controlProperties
            "readyFunction": this._AlbumDisambiguationContextReady.bind(this),
        },
		
		//when there are artists with same albums
        "AlbumPlayDisambiguation": {
            "template" : "List2Tmplt",
            "sbNameId": this.uiaId,
            "sbNameSubMap": {deviceName: this._connectedDevs.A},
            "controlProperties": {
                "List2Ctrl" : {
                    numberedList: true,
                    requestSize: 20,
                    dataList: loadingDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',
                        text1Id: "Albums"
                    },
                    hideLoadingOverlayTimeout: 0,
                    scrollTo : 0,
                    selectCallback : this._listItemClickCallback.bind(this),
                    needDataCallback : this._requestMoreDataCallback.bind(this)
                } // end of properties for "ListCtrl"
            }, // end of list of controlProperties
            "readyFunction": this._AlbumPlayDisambiguationContextReady.bind(this),
        }
    }; // end of this._contextTable
    //@formatter:on

    //@formatter:off
    /** table of messages MMUI send to GUI
     The value for each key is a function that will be called when the message comes in from MMUI.
     Because the function is defined with .bind(this), this will refer to the usbaudioApp Object when the function is called.
     */
    this._messageTable = {
        "DeviceSelected": this._DeviceSelectedMsgHandler.bind(this),
        "PlaybackStatus" : this._PlaybackStatusMsgHandler.bind(this),
        "ObjectInfo" : this._ObjectInfoMsgHandler.bind(this),
        "NowPlayingData" : this._NowPlayingDataMsgHandler.bind(this),
        "PlayerState" : this._PlayerStateMsgHandler.bind(this),
        "CoverArt" : this._CoverArtMsgHandler.bind(this),
        "TimedSbn_ConnectionStatus" : this.TimedSbn_ConnectionStatusMsgHandler.bind(this),
        "RepeatShuffleStatus": this._RepeatShuffleStatusMsgHandler.bind(this),
        "TimedSbn_ErrorCondition": this._TimedSbn_ErrorConditionMsgHandler.bind(this),
        "TimedSbn_CurrentSong": this._TimedSbn_CurrentSongMsgHandler.bind(this),
        "DeviceDisabled": this._DeviceDisabledMsgHandler.bind(this),
        "SetSongsListIndex": this._SetSongsListIndexMsgHandler.bind(this),
        "ClearTrackMetadata": this._ClearTrackMetadataMsgHandler.bind(this),
        "SendScreenTitle": this._SendScreenTitleMsgHandler.bind(this),
        "SetAppleFriendlyName": this._SetAppleFriendlyNameMsgHandler.bind(this),
        "FolderBrowsingPossible": this._FolderBrowsingPossibleMsgHandler.bind(this),
        "MetadataBrowsingPossible": this._MetadataBrowsingPossibleMsgHandler.bind(this),
        "MltPossible": this._MltPossibleMsgHandler.bind(this),
        "BrowseArtistAlbumsInfo": this._BrowseArtistAlbumsInfoMsgHandler.bind(this),
        // VR events
        "BrowseArtistDisambiguate": this._BrowseArtistDisambiguate.bind(this),
        "BrowseAlbumDisambiguate": this._BrowseAlbumDisambiguate.bind(this),
        "PlayAlbumDisambiguate": this._PlayAlbumDisambiguate.bind(this),
        "PlayRequest": this._PlayRequest.bind(this),
        "BrowsePlayRequest": this._BrowsePlayRequestMsgHandler.bind(this),
        "UserIntent": this._UserIntentMsgHandler.bind(this)
    }; // end of this._messageTable
    //@formatter:on

    //@formatter:off
    /** table of cntextPath to play Disambiguate Album
     */
    this._playDisambiguatePathTable = {
        ArtistAlbums: "Artist_AlbumSongs",
        Genre_ArtistAlbums: "Genre_Artist_AlbumSongs",
        GenresAllArtists_ArtistAlbums: "GenresAllArtists_Artist_AlbumSongs"
    }; // end of this._playDisambiguatePathTable
    //@formatter:on

    //@formatter:off
    /** table of cntextPath to play all items
     */
    this._playAllItemPathTable = {
        "Albums": {
            AllAlbums: "AlbumsAllSongs",
            AllArtistsAllAlbums: "ArtistsAllAlbums_AllSongs",
            ArtistAlbums: "Artist_AllSongs",
            GenresAllArtists_AllAlbums: "GenresAllArtists_AllAlbums_AllSongs",
            GenresAllArtists_ArtistAlbums: "GenresAllArtists_Artist_AllSongs",
            Genre_AllAlbums: "Genre_AllAlbums_AllSongs",
            Genre_ArtistAlbums: "Genre_Artist_AllSongs",
        },
        "Artists": {
            AllArtists: "ArtistsAllAlbums_AllSongs",
            GenreArtists: "Genre_AllAlbums_AllSongs",
            GenresAllArtists: "GenresAllArtists_AllAlbums_AllSongs",
            GenreArtists: "Genre_AllAlbums_AllSongs",
        }
    }; // end of this._playAllItemPathTable
    //@formatter:on

};

/**************************
 * Context handlers
 **************************/
// Songs Context
usbaudioApp.prototype._SongsCtxtContextIn = function ()
{
    this._presetContextConfig();
};

usbaudioApp.prototype._SongsContextReady = function (captureData)
{
    this._contextReadyAction(captureData);
};

usbaudioApp.prototype._SongsCtxtContextOut = function ()
{
    this._saveIndex();
};

// Albums Context
usbaudioApp.prototype._AlbumsCtxtContextIn = function ()
{
    this._presetContextConfig();
};

usbaudioApp.prototype._AlbumsContextReady = function (captureData)
{
    this._contextReadyAction(captureData);
};

usbaudioApp.prototype._AlbumsCtxtContextOut = function ()
{
    this._saveIndex();
};

// Artists Context
usbaudioApp.prototype._ArtistsCtxtContextIn = function ()
{
    this._presetContextConfig();
};

usbaudioApp.prototype._ArtistsContextReady = function (captureData)
{
    this._contextReadyAction(captureData);
};

usbaudioApp.prototype._ArtistsCtxtContextOut = function ()
{
    this._saveIndex();
};

// Playlists Context
usbaudioApp.prototype._PlaylistsCtxtContextIn = function ()
{
    this._presetContextConfig();
};

usbaudioApp.prototype._PlaylistsContextReady = function (captureData)
{
    this._contextReadyAction(captureData);
};

usbaudioApp.prototype._PlaylistsCtxtContextOut = function ()
{
    this._saveIndex();
};

// Genres Context
usbaudioApp.prototype._GenresCtxtContextIn = function ()
{
    this._presetContextConfig();
};

usbaudioApp.prototype._GenresContextReady = function (captureData)
{
    this._contextReadyAction(captureData);
};

usbaudioApp.prototype._GenresCtxtContextOut = function ()
{
    this._saveIndex();
};

// Audiobooks Context
usbaudioApp.prototype._AudiobooksCtxtContextIn = function ()
{
    this._presetContextConfig();
};

usbaudioApp.prototype._AudiobooksContextReady = function (captureData)
{
    this._contextReadyAction(captureData);
};

usbaudioApp.prototype._AudiobooksCtxtContextOut = function ()
{
    this._saveIndex();
};

// Podcasts Context
usbaudioApp.prototype._PodcastsCtxtContextIn = function ()
{
    this._presetContextConfig();
};

usbaudioApp.prototype._PodcastsContextReady = function (captureData)
{
    this._contextReadyAction(captureData);
};

usbaudioApp.prototype._PodcastsCtxtContextOut = function ()
{
    this._saveIndex();
};

// Episodes Context
usbaudioApp.prototype._EpisodesCtxtContextIn = function ()
{
    this._presetContextConfig();
};

usbaudioApp.prototype._EpisodesContextReady = function (captureData)
{
    this._contextReadyAction(captureData);
};

usbaudioApp.prototype._EpisodesCtxtContextOut = function ()
{
    this._saveIndex();
};

// Chapters Context
usbaudioApp.prototype._ChaptersCtxtContextIn = function ()
{
    this._presetContextConfig();
};

usbaudioApp.prototype._ChaptersContextReady = function (captureData)
{
    this._contextReadyAction(captureData);
};

usbaudioApp.prototype._ChaptersCtxtContextOut = function ()
{
    this._saveIndex();
};

// Folders context
usbaudioApp.prototype._FoldersContextReady = function (captureData)
{
    log.debug("FoldersContextReady called params = ", JSON.stringify(this._currentContext.params));

    if (captureData)
    {
        this._topItemOptions.setTopItem = true;
        this._topItemOptions.top = captureData.templateContextCapture.controlData.topItem;
        this._topItemOptions.focus = captureData.templateContextCapture.controlData.focussedItem;
    }

    if (this._hasContextPayload() && this._currentContext.params.payload.hasOwnProperty("path") && 
        this._currentContext.params.payload.hasOwnProperty("folderId") && this._currentContext.params.payload.hasOwnProperty("folderName") && 
        this._currentContext.params.payload.hasOwnProperty("viewType"))
    {
        this._currentContextId = this._currentContext.params.payload.path;
        this._appsdkGetFolderItems(this._currentContext.params.payload.folderId, this._currentContext.params.payload.folderName, this._currentContext.params.payload.viewType, 0, null, "browse", false);
    }
    else
    {
        log.warn("USBAUDIO: Folders has context payload:", this._hasContextPayload());
    }
};

usbaudioApp.prototype._USBAudioCtxtOut = function ()
{
    if (this._outgoingContextTemplate)
    {
        this._contextTable["USBAudio"].controlProperties.List2Ctrl.scrollTo = this._outgoingContextTemplate.list2Ctrl.topItem;
        this._contextTable["USBAudio"].controlProperties.List2Ctrl.focussedItem = this._outgoingContextTemplate.list2Ctrl.focussedItem;
    }
};

// NowPlaying Context
usbaudioApp.prototype._NowPlayingCtxtReadyToDisplay = function ()
{
    log.debug("NowPlayingCtxtReadyToDisplay called...");
    //Code logic for screenTitle now moved in _NowPlayingDataMsgHandler
    
    log.debug("this._connectedDevs.RepeatShuffleReady in _NowPlayingCtxtReadyToDisplay is ", this._connectedDevs.RepeatShuffleReady);

    this._RepeatShuffleReady(this._connectedDevs.RepeatShuffleReady);
    if (this._cacheRepeatShuffleState)
    {
        this._updateUmpButtons(this._currentContextTemplate, this._cacheRepeatShuffleState);
   	}
   	 
    log.debug("this._connectedDevs.playbackReady is ", this._connectedDevs.playbackReady);
    this._PlaybackReady(this._connectedDevs.playbackReady);
    this._populateNowPlayingCtrl(this._currentContextTemplate, this._cachedSongDetails);
    if (this._connectedDevs.playbackReady)
    {
        this._populateCoverArt(this._currentContextTemplate, this._cachedSongDetails);
    }

	this._setFocussedButton();

    this._setTotalElapsedTime();
};

usbaudioApp.prototype._setFocussedButton = function()
{
	if (this._currentContext && this._currentContext.ctxtId && this._currentContext.ctxtId == "NowPlaying" && this._currentContextTemplate)
	{
		// clone currently focussed button
		var buttonId = this._getCurrentlyFocussedButton();
		
		// attempt focus placement
	    if (buttonId != null)
	    {
	    	log.debug("buttonId is not null, buttonId = ", buttonId);
	        // set focus
	        this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonFocus(buttonId);
	        this._contextTable.NowPlaying.controlProperties.NowPlayingCtrl.umpConfig.initialButtonFocus = buttonId;
	    }
	}
};

usbaudioApp.prototype._setCurrentlyFocussedButton = function(btnID)
{
	if(this._connectedDevs.deviceSelected == this._connectedDevs.A.deviceId)
    {
        this._connectedDevs.A.currentlyFocussedButton = btnID;
    }
    else if (this._connectedDevs.deviceSelected == this._connectedDevs.B.deviceId)
    {
        this._connectedDevs.B.currentlyFocussedButton = btnID;
    }
};

usbaudioApp.prototype._getCurrentlyFocussedButton = function()
{
	buttonID = -1;

	if(this._connectedDevs.deviceSelected == this._connectedDevs.A.deviceId)
    {
        buttonID = this._connectedDevs.A.currentlyFocussedButton;
    }
    else if (this._connectedDevs.deviceSelected == this._connectedDevs.B.deviceId)
    {
        buttonID = this._connectedDevs.B.currentlyFocussedButton;
    }
    return buttonID;
};

usbaudioApp.prototype._NowPlayingCtxtContextOut = function ()
{
    if (this._gracenoteTimeout != null)
    {
        this._removeGracenote();
    }
};

usbaudioApp.prototype._ErrorConditionCtxtIn = function ()
{
    if (this._currentContext && this._currentContext.params.hasOwnProperty("payload") && this._currentContext.params.payload.hasOwnProperty("deviceId"))
    {
        var id = 0;
        var name = "";
        if (this._connectedDevs.A.deviceId === this._currentContext.params.payload.deviceId)
        {
            id = 1;
            name = this._connectedDevs.A.name;
        }
        else
        {
            id = 2;
            name = this._connectedDevs.B.name;
        }

        this._contextTable["ErrorCondition"].sbNameSubMap = {deviceId: id, deviceName: name};
        this._contextTable["ErrorCondition"].sbNameIcon = "IcnSbnEnt.png";
    }
};

// Error Context
usbaudioApp.prototype._ErrorConditionCtxtReadyToDisplay = function ()
{
    if (this._hasContextPayload() && this._currentContext.params.payload.hasOwnProperty("error"))
    {
        var error = this._getErrorId(this._currentContext.params.payload.error);

        this._currentContextTemplate.dialog3Ctrl.setText1Id(error);
    }
    else
    {
        log.info("USBAUDIO: error context without error message.", this._currentContext);
    }
};

// Album Disambiguation context
usbaudioApp.prototype._AlbumDisambiguationContextReady = function (captureData)
{
    log.debug("AlbumDisambiguationContextReady call");
    if (captureData)
    {
        this._topItemOptions.setTopItem = true;
        this._topItemOptions.top = captureData.templateContextCapture.controlData.topItem;
        this._topItemOptions.focus = captureData.templateContextCapture.controlData.focussedItem;
    }

    if (this._hasContextPayload() && this._currentContext.params.payload.hasOwnProperty("path") && 
        this._currentContext.params.payload.hasOwnProperty("albumId"))
    {
        var path = "Invalid";
        if (this._existBrowsingTable(this._currentContext.params.payload.path))
        {
            path = this._currentContext.params.payload.path;
        }
        var filterList = new Array();        
        filterList.push({
                      filterEnum: this._browsingTable[path].browseCategory, 
                      idLevel1: this._currentContext.params.payload.albumId, 
                      idLevel2: this._objectId.USBMS_ObjectID_Invalid,
                      idLevel3: this._objectId.USBMS_ObjectID_Invalid, 
                      sortOrder: this._browsingTable[path].sortOrder
        });
        this._requestList(
                      filterList,
                      0,                                             // offset index
                      null,                                          // context data list NOTE: empty every time we enter context
                      "AlbumBrowseDisambiguation");                  // name of the context
    }
    else
    {
        log.info("USBAUDIO: album disambiguation context with empty payload.", this._currentContext.ctxtId);
        if (this._currentContextTemplate.hasOwnProperty("list2Ctrl") && this._currentContextTemplate.list2Ctrl.setLoading && this._currentContextTemplate.list2Ctrl.inLoading)
        {
            this._currentContextTemplate.list2Ctrl.setLoading(false);
        }
    }
};

// Album Play Disambiguation context
usbaudioApp.prototype._AlbumPlayDisambiguationContextReady = function (captureData)
{
    log.debug("AlbumPlayDisambiguationContextReady call");
    if (captureData)
    {
        this._topItemOptions.setTopItem = true;
        this._topItemOptions.top = captureData.templateContextCapture.controlData.topItem;
        this._topItemOptions.focus = captureData.templateContextCapture.controlData.focussedItem;
    }

    if (this._hasContextPayload() && this._currentContext.params.payload.hasOwnProperty("path") && 
        this._currentContext.params.payload.hasOwnProperty("albumId"))
    {
        var path = "Invalid";
        if (this._existBrowsingTable(this._currentContext.params.payload.path))
        {   
            path = this._currentContext.params.payload.path;
        }
        var filterList = new Array();        
        filterList.push({
                      filterEnum: this._browsingTable[path].browseCategory, 
                      idLevel1: this._currentContext.params.payload.albumId, 
                      idLevel2: this._objectId.USBMS_ObjectID_Invalid, 
                      idLevel3: this._objectId.USBMS_ObjectID_Invalid, 
                      sortOrder: this._browsingTable[path].sortOrder
        });
        this._requestList(
                      filterList,
                      0,                                             // offset index
                      null,                                          // context data list NOTE: empty every time we enter context
                      "AlbumPlayDisambiguation");                    // name of the context
    }
    else
    {
        log.info("USBAUDIO: album play disambiguation context with empty payload.", this._currentContext.ctxtId);
        if (this._currentContextTemplate.hasOwnProperty("list2Ctrl") && this._currentContextTemplate.list2Ctrl.setLoading && this._currentContextTemplate.list2Ctrl.inLoading)
        {
            this._currentContextTemplate.list2Ctrl.setLoading(false);
        }
    }
};

/**************************
 * Control callbacks
 **************************/
usbaudioApp.prototype._dialogDefaultSelectCallback = function (dialogBtnCtrlObj, appData, params)
{
    log.debug("dialogDefaultSelectCallback  called, appData: " + appData);

    if (this._currentContext && this._currentContextTemplate)
    {
        switch (this._currentContext.ctxtId)
        {
            case 'ErrorCondition' :
                switch (appData)
                {
                    case 'Global.OK':
                        framework.sendEventToMmui("Common", "Global.Yes");
                        break;
                }
                break;
        }
    }
};

usbaudioApp.prototype._listItemClickCallback = function (listCtrlObj, appData, params)
{
    var itemIndex = params.itemIndex;
    log.info("_listItemClickCallback  for context: " + this._currentContext.ctxtId);
    log.debug("selected itemIndex: "+ itemIndex + ", appData: " + JSON.stringify(appData) + ", userIntent = " + this._userIntent);
    log.debug("this._currentContext.params = " + JSON.stringify(this._currentContext.params));

    switch(this._currentContext.ctxtId) {
        case 'USBAudio' :
            switch (appData)
            {
                case "BrowseSongs":
                    if (this._userIntent == "Play")
                    {
                        framework.sendEventToMmui(this.uiaId, "PlaySongs", params.fromVui);
                    }
                    else
                    {
                        framework.sendEventToMmui(this.uiaId, appData, params.fromVui);
                    }
                    break;
                case "BrowseAlbums":
                    if (this._userIntent == "Play")
                    {
                        framework.sendEventToMmui(this.uiaId, "PlayAlbums", params.fromVui);
                    }
                    else
                    {
                        framework.sendEventToMmui(this.uiaId, appData, params.fromVui);
                    }
                    break;
                case "BrowseArtists":
                    if (this._userIntent == "Play")
                    {
                        framework.sendEventToMmui(this.uiaId, "PlayArtists", params.fromVui);
                    }
                    else
                    {
                        framework.sendEventToMmui(this.uiaId, appData, params.fromVui);
                    }
                    break;
                case "BrowseGenres":
                    if (this._userIntent == "Play")
                    {
                        framework.sendEventToMmui(this.uiaId, "PlayGenres", params.fromVui);
                    }
                    else
                    {
                        framework.sendEventToMmui(this.uiaId, appData, params.fromVui);
                    }
                    break;
                case "BrowsePlaylists":
                    if (this._userIntent == "Play")
                    {
                        framework.sendEventToMmui(this.uiaId, "PlayPlaylists", params.fromVui);
                    }
                    else
                    {
                        framework.sendEventToMmui(this.uiaId, appData, params.fromVui);
                    }
                    break;
                case "BrowseFolders" :
                    if (this._userIntent == "Play")
                    {
                        framework.sendEventToMmui(this.uiaId, "PlayFolders", params.fromVui);
                    }
                    else
                    {
                        framework.sendEventToMmui(this.uiaId, appData, params.fromVui);
                    }
                    break;
                case "BrowsePodcasts" :
                    if (this._userIntent == "Play")
                    {
                        framework.sendEventToMmui(this.uiaId, "PlayPodcasts", params.fromVui);
                    }
                    else
                    {
                        framework.sendEventToMmui(this.uiaId, appData, params.fromVui);
                    }
                    break;
                case "BrowseAudiobooks" :
                    if (this._userIntent == "Play")
                    {
                        framework.sendEventToMmui(this.uiaId, "PlayAudiobooks", params.fromVui);
                    }
                    else
                    {
                        framework.sendEventToMmui(this.uiaId, appData, params.fromVui);
                    }
                    break;
            }
            break;
        case "Playlists" :
            if (this._userIntent == "Play")
            {
            	framework.sendEventToMmui(this.uiaId, "PlayPlaylist", {payload:{playlistName: appData.name, playlistId: appData.id}}, params.fromVui);
            }
            else
            {
                framework.sendEventToMmui(this.uiaId, "BrowsePlaylist", {payload:{playlistName: appData.name, playlistId: appData.id}}, params.fromVui);
            }
            break;
        case "Podcasts":
            if (this._userIntent == "Play")
            {
            	framework.sendEventToMmui(this.uiaId, "PlayPodcast", {payload:{podcastName: appData.name, podcastId: appData.id}}, params.fromVui);
            }
            else
            {
                framework.sendEventToMmui(this.uiaId, "BrowsePodcast", {payload:{podcastName: appData.name, podcastId: appData.id}}, params.fromVui);
            }
            break;
        case "Audiobooks":
            var type = this._mdFilter.USBM_MetadataType_ObjectName;
            if (appData.type == this._itemType.USBMS_ItemType_Browsable)
            {
                type = this._mdFilter.USBM_MetadataType_AlbumName;
            }
            framework.sendEventToMmui(this.uiaId, "SetAudiobookType", {payload:{audiobookType: type}}, params.fromVui);
            if (this._userIntent == "Play")
            {
          		log.debug("AUDIOBOOKS, PLAY, ITEM TYPE == " + appData.type);
            	if (appData.type == this._itemType.USBMS_ItemType_Browsable)
            	{
          			log.info("AUDIOBOOKS, PLAY AUDIOBOOK");
	                this._playLineNumber(appData.name, this._mdFilter.USBM_MetadataType_Kind, appData.id, params.fromVui);
	            }
            	else if (appData.type == this._itemType.USBMS_ItemType_PlayableFile)
            	{
          			log.info("AUDIOBOOKS, PLAY CHAPTER");
	                this._clearMetadata();
	                this._clearTotalElapsedTime();
                    var filter = this._createFilter(this._currentContextId);
                    this._setSongListCategory(filter.filterEnum, null);
	                framework.sendEventToMmui(this.uiaId, "PlayChapterIndex", {payload:{filter : filter, objectId : itemIndex}}, params.fromVui);
            	}
            }
            else
            {
          		log.debug("AUDIOBOOKS, BROWSE, ITEM TYPE == " + appData.type);
            	if (appData.type == this._itemType.USBMS_ItemType_Browsable)
            	{
          			log.info("AUDIOBOOKS, BROWSE AUDIOBOOK");
	                framework.sendEventToMmui(this.uiaId, "BrowseAudiobook", {payload:{audiobookName: appData.name, audiobookId: appData.id}}, params.fromVui);
            	}            	
            	else if (appData.type == this._itemType.USBMS_ItemType_PlayableFile)
            	{
          			log.info("AUDIOBOOKS, PLAY CHAPTER");
	                this._clearMetadata();
	                this._clearTotalElapsedTime();
                    var filter = this._createFilter(this._currentContextId);
                    this._setSongListCategory(filter.filterEnum, null);
	                framework.sendEventToMmui(this.uiaId, "PlayChapterIndex", {payload:{filter : filter, objectId : itemIndex}}, params.fromVui);
            	}
            }
            break;            
        case "Episodes" :
            this._clearMetadata();
            this._clearTotalElapsedTime();
            var filter = this._createFilter(this._currentContextId);
            this._setSongListCategory(filter.filterEnum, null);
            if (appData.name != "allEpisodes")
            {
                framework.sendEventToMmui(this.uiaId, "PlayEpisodeIndex", {payload:{filter : filter, objectId : itemIndex - 1}}, params.fromVui);
            }
            else
            {
                framework.sendEventToMmui(this.uiaId, "PlayEpisodeIndex", {payload:{filter : filter, objectId : 0}}, params.fromVui);
            }
            break;
        case "Chapters" :
            this._clearMetadata();
            this._clearTotalElapsedTime();
            var filter = this._createFilter(this._currentContextId);
            this._setSongListCategory(filter.filterEnum, null);
            if (appData.name != "allChapters")
            {
	            framework.sendEventToMmui(this.uiaId, "PlayChapterIndex", {payload:{filter : filter, objectId : itemIndex - 1}}, params.fromVui);
            }
            else
            {
                // if playback Audiobook has no chapter, we play Audiobook
                if (listCtrlObj && listCtrlObj.hasOwnProperty("dataList") && listCtrlObj.dataList.hasOwnProperty("items") && listCtrlObj.dataList.items.length == 1)
                {
                    var lpath = "Audiobooks";
                    var lFilter = {
                           filterEnum: this._browsingTable[lpath].browseCategory,
                           idLevel1: this._browsingTable[lpath].idLevel1.id,
                           idLevel2: this._browsingTable[lpath].idLevel2.id,
                           idLevel3: this._browsingTable[lpath].idLevel3.id,
                           sortOrder: this._browsingTable[lpath].sortOrder
                        };
                    var index = this._browsingTable["AudiobookChapters"].idLevel1.id; // set Audiobook index
                    log.info("play Audiobook index = " + index);
                    framework.sendEventToMmui(this.uiaId, "PlayChapterIndex", {payload:{filter : lFilter, objectId : index}}, params.fromVui);
                }
                else
                {
                    framework.sendEventToMmui(this.uiaId, "PlayChapterIndex", {payload:{filter : filter, objectId : 0}}, params.fromVui);
                }
            }
            break;
        case "Genres" :
            if (appData.name != "allArtists")
            {
                if (this._userIntent == "Play")
                {
                    framework.sendEventToMmui(this.uiaId, "PlayGenre", {payload:{genreName: appData.name, genreId: appData.id}}, params.fromVui);
                }
                else
                {
                    framework.sendEventToMmui(this.uiaId, "BrowseGenre", {payload:{genreName: appData.name, genreId: appData.id}}, params.fromVui);
                }
            }
            else
            {
                if (this._userIntent == "Play")
                {
                    if (this._currentContextId == "AllGenres")
                    {
                        var contextPath = "GenresAllArtists_AllAlbums_AllSongs";
                        this._SelectSongsAndPlay(this._payloadTable[contextPath].md_types,
                                                  this._createMdInfo(this._payloadTable[contextPath].md_info),
                                                  this._payloadTable[contextPath].sort_settings,
                                                  params.fromVui, contextPath);
                    }
                    else
                    {
                        this._playLineNumber(null, null, null, params.fromVui);
                    }
                }
                else
                {
                    framework.sendEventToMmui(this.uiaId, "BrowseAll", params.fromVui);
                }
            }
            break;
        case "Artists" :
            if (appData.name != "allAlbums")
            {
                if (this._userIntent == "Play")
                {
                	framework.sendEventToMmui(this.uiaId, "PlayAnyArtist", {payload:{artistName: appData.name, artistId: appData.id}}, params.fromVui);
                }
                else
                {
                    // check how many albums this artist has. If only one go to Songs context
                    this._countAlbums(appData.name, "browse", appData.id, params.fromVui, this._currentContextId);
                }
            }
            else
            {
                if (this._userIntent == "Play")
                {

                    var contextPath = this._playAllItemPathTable[this._currentContext.ctxtId][this._currentContextId];
                    if (contextPath)
                    {
                        this._SelectSongsAndPlay(this._payloadTable[contextPath].md_types,
                                                  this._createMdInfoFromMsg(this._currentContext),
                                                  this._payloadTable[contextPath].sort_settings,
                                                  params.fromVui, contextPath);
                    }
                    else
                    {
                        this._playLineNumber(null, null, null, params.fromVui);
                    }
                }
                else
                {
                    framework.sendEventToMmui(this.uiaId, "BrowseAll", params.fromVui);
                }
            }
            break;
        case "Albums" :
            if (appData.name != "allSongs")
            {
                if (this._userIntent == "Play")
                {
                    framework.sendEventToMmui(this.uiaId, "PlayAnyAlbum", {payload:{albumName: appData.name, albumId: appData.id}}, params.fromVui);
                }
                else
                {
                    framework.sendEventToMmui(this.uiaId, "BrowseAlbumArtist", {payload:{albumName: appData.name, artistName: "", albumId: appData.id}}, params.fromVui);
                }
            }
            else
            {
                if (this._userIntent == "Play")
                {
                    var contextPath = this._playAllItemPathTable[this._currentContext.ctxtId][this._currentContextId];
                    if (contextPath)
                    {
                        this._SelectSongsAndPlay(this._payloadTable[contextPath].md_types,
                                                  this._createMdInfoFromMsg(this._currentContext),
                                                  this._payloadTable[contextPath].sort_settings,
                                                  params.fromVui, contextPath);
                    }
                    else
                    {
                        this._playLineNumber(null, null, null, params.fromVui);
                    }
                }
                else
                {
                    log.debug("BrowseAll");
                    framework.sendEventToMmui(this.uiaId, "BrowseAll", params.fromVui);
                }
            }
            break;
        case "Folders" :
            switch (appData.type)
            {
                case 7: // allSongs
                    if (this._userIntent == "Play" &&
                        this._currentContext.hasOwnProperty("params") &&
                        this._currentContext.params.hasOwnProperty("payload") &&
                        this._currentContext.params.payload.hasOwnProperty("folderId"))
                        {
                            this._appsdkGetFolderItems(this._currentContext.params.payload.folderId, this._currentContext.params.payload.folderName, this._viewType.list, 0, null, "play", params.fromVui);
                        }
                        else
                        {
                            framework.sendEventToMmui(this.uiaId, "BrowseAll", params.fromVui);
                        }
                    break;
                case this._itemType.USBMS_ItemType_Browsable:
                    if (this._userIntent == "Play")
                    {
                        framework.sendEventToMmui(this.uiaId, "PlayFolder", {payload:{folderId: appData.id, folderName: appData.name, viewType: this._viewType.tree}}, params.fromVui);
                    }
                    else
                    {
                        framework.sendEventToMmui(this.uiaId, "BrowseFolder", {payload:{folderId: appData.id, folderName: appData.name, viewType: this._viewType.tree}}, params.fromVui);
                    }
                    break;
                case this._itemType.USBMS_ItemType_PlayableFile:
                    if (this._currentContext.hasOwnProperty("params") &&
                        this._currentContext.params.hasOwnProperty("payload") &&
                        this._currentContext.params.payload.hasOwnProperty("folderId") &&
                        this._currentContext.params.payload.hasOwnProperty("viewType"))
                        {
                            this._clearMetadata();
                            this._clearTotalElapsedTime();
                            var filter = this._createFilter(this._currentContextId, this._currentContext.params.payload.folderId);
                            this._setSongListCategory(filter.filterEnum, null);
                            var index = itemIndex;
                            if (this._hasAdditionalItem(this._currentContext.ctxtId, this._currentContext.params.payload.viewType))
                            {
                                index = itemIndex - 1;
                            }
                            framework.sendEventToMmui(this.uiaId, "PlaySongIndex", {payload:{filter: filter, objectId: index}}, params.fromVui);
                        }
                    break;
            }
            break;
        case "Songs" :
            this._clearMetadata();
            this._clearTotalElapsedTime();
            itemIndex = parseInt(itemIndex);
            var filter = this._createFilter(this._currentContextId);
            var playListName = "";
            if (this._currentContextId == "PlaylistSongs")
            {
                playListName = this._payloadTable[this._currentContextId].md_info.playlist.value;
            }
            this._setSongListCategory(filter.filterEnum, playListName);
            framework.sendEventToMmui(this.uiaId, "PlaySongIndex", {payload:{filter: filter, objectId: itemIndex}}, params.fromVui);
            break;
        case "AlbumBrowseDisambiguation":
            framework.sendEventToMmui(this.uiaId, "ChooseAlbumArtist", {payload:{artistName: appData.name, artistId: appData.id}}, params.fromVui);
            break;
        case "AlbumPlayDisambiguation":
            var albumName = this._currentContext.params.payload.albumName;
            var albumId = 0;
            if (this._currentContext.params.payload.albumId)
            {
                albumId = this._currentContext.params.payload.albumId;
            }

            // here inform MMUI about what artist, at the end, we have chosen...
            framework.sendEventToMmui(this.uiaId, "DisambiguationArtistAlbumComplete", {payload:{artistName: appData.name, artistId: appData.id, albumName: albumName, albumId: albumId}}, params.fromVui);
            this._SelectSongsAndPlay(
                [this._mdFilter.USBM_MetadataType_ObjectName],
                [{type: this._mdFilter.USBM_MetadataType_ArtistName, value: appData.name, item_id: appData.id}, {type: this._mdFilter.USBM_MetadataType_AlbumName, value: albumName, item_id: albumId}],
                [{metadata_type: this._mdFilter.USBM_MetadataType_AlbumOrder, sort_order: this._soFilter.USBM_SortOrder_AlphaNumericAscending}], params.fromVui, "AlbumsDisambiguateSongs");
            break;
        default:
            log.warn("USBAudioApp: Unknown context: ", this._currentContext.ctxtId);
            break;
    }
};

/**all ump buttons clicked in NowPlayingContext*/
usbaudioApp.prototype._umpDefaultSelectCallback = function (ctrlObj, appData, params)
{
    log.debug("_umpDefaultSelectCallback called...", appData);

    switch (appData)
    {
        case "BrowseFolders":
            framework.sendEventToMmui(this.uiaId, "SelectRootFolder");
            break;
        case "playpause":
            if (params.state == "Play")
            {
                framework.sendEventToMmui("Common", "Global.Resume");
            }
            else if (params.state == "Pause")
            {
                framework.sendEventToMmui("Common", "Global.Pause");
            }
            else
            {
                log.warn("usbaudio: Uknown state of ump playpause button");
                framework.sendEventToMmui("Common", "Global.Play");
            }
            break;
        case "shuffle":
            framework.sendEventToMmui(this.uiaId, "Shuffle");
            break;
        case "repeat":
            framework.sendEventToMmui(this.uiaId, "Repeat");
            break;
        case "GenerateMoreLikeThis":
            framework.sendEventToMmui(this.uiaId, "GenerateMoreLikeThis");
            this._payloadTable["PlaylistSongs"].md_info.playlist.value = "";//added to move the focus on the first song in PlaylistSongs(in _setTopItem), when there is new MLT selection
            break;
        case "SongList":
            framework.sendEventToMmui(this.uiaId, "SongList");
            break;
        case "next":
            framework.sendEventToMmui("Common", "Global.Next");
            break;
        case "prev":
            framework.sendEventToMmui("Common", "Global.Previous");
            break;
        case "source":
            framework.sendEventToMmui(this.uiaId, "SelectSourceMenu");
            break;
        case "settings":
            framework.sendEventToMmui(this.uiaId, "SelectSettings");
            break;
        default:
            log.warn("usbaudio: Unrecognized ump button clicked");
    }
};

usbaudioApp.prototype._umpFocusCallback = function(ctrlObj, appData, params)
{
    // find button id based on the fucussed button's appdata
    log.debug("_umpFocusCallback typeof ctrlObj.properties.buttonConfig:", typeof ctrlObj.properties.buttonConfig);

	if (this._currentContext && this._currentContext.ctxtId && this._currentContext.ctxtId == "NowPlaying" && this._currentContextTemplate)
	{
	    if (ctrlObj && ctrlObj.properties && ctrlObj.properties.buttonConfig && typeof ctrlObj.properties.buttonConfig == 'object')
	    {
	        var buttonConfig = ctrlObj.properties.buttonConfig;
	        for (var i in buttonConfig)
	        {
	            if (buttonConfig[i].appData === appData)
	            {
	            	log.debug("buttonConfig[i].appData: ", buttonConfig[i].appData);
	                // set currently focussed button in the context table
	                this._setCurrentlyFocussedButton(i);
	            }
	        }
	    }	    
	}
	else
    {
    	log.info("Skipping focus change because not in NowPlaying, selected button is still ", this._getCurrentlyFocussedButton());
    }
};

usbaudioApp.prototype._umpHoldStartCallback = function (ctrlObj, appData, params)
{
    log.debug("_umpHoldStartCallback called...", appData);

    if (appData == "next")
    {
        framework.sendEventToMmui("Common", "Global.NextHoldStart");
    }
    else if (appData == "prev")
    {
        framework.sendEventToMmui("Common", "Global.PreviousHoldStart");
    }
};

usbaudioApp.prototype._umpHoldStopCallback = function (ctrlObj, appData, params)
{
    log.debug("_umpHoldStopCallback called...", appData);
    //Take no action if app has changed.
    if(framework._currentAppUiaId === 'usbaudio')
    {
        if (appData == "next")
        {
            framework.sendEventToMmui("Common", "Global.NextHoldStop");
        }
        else if (appData == "prev")
        {
            framework.sendEventToMmui("Common", "Global.PreviousHoldStop");
        }
    }
};

usbaudioApp.prototype._umpSlideCallback = function (ctrlObj, appData, params)
{
    log.debug("_umpSlideCallback called");
    clearTimeout(this._finalAdjustmentTimeout);
    this._finalAdjustmentTimeout = null;
    if (appData == "scrubber" && params.finalAdjustment != true)
    {
        this._finalAdjustmentTimeout = setTimeout(this._jumpToPosition.bind(this), this._settleTime);
    }


    this._umpProgressValue = params.value;
    if (params.value < 0)
    {
        params.value = 0;
    }
    else if (params.value > 1)
    {
        params.value = 1;
    }
    if (appData == "scrubber" && params.finalAdjustment == true)
    {
        this._stopElapsedUpdate = false;
    }

    if (appData == "scrubber" && params.finalAdjustment == true && (Math.abs(this._umpElapseTime - (this._umpTotalTime*params.value)) > 2))
    {
        var percent = Math.round(params.value*100);
        this._umpElapseTime = parseInt(this._umpTotalTime * this._umpProgressValue);
        framework.sendEventToMmui(this.uiaId, "PlaybackJumpToPosition", {payload:{percent: percent}});
    }
    else if (params.finalAdjustment == false)
    {
        this._stopElapsedUpdate = true;
        this._umpSecondaryElapseTime = parseInt(this._umpTotalTime * this._umpProgressValue);
        this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setElapsedTime(this._secondsToHHMMSS(this._umpSecondaryElapseTime));
    }
};

//when we are in song context and we pull the list of songs
usbaudioApp.prototype._requestMoreDataCallback = function (index)
{
    log.debug("requestMoreDataCallback called");
    if (this._currentContext.ctxtId != "Folders")
    {
        this._requestMore(index);
    }
    else
    {
        this._appsdkGetFolderItems(this._currentContext.params.payload.folderId, this._currentContext.params.payload.folderName, this._currentContext.params.payload.viewType, index-1, this._currentContextTemplate.list2Ctrl.dataList, "browse", false);
    }
};

/******************************
 * Message Handlers
 ******************************/
usbaudioApp.prototype._TimedSbn_ErrorConditionMsgHandler = function (msg)
{
    var error = this._getErrorId(msg.params.payload.error);
    framework.common.startTimedSbn(this.uiaId, this._usbaudioErrorSbn, "errorNotification", {sbnStyle: "Style02", imagePath1 : 'IcnSbnEnt.png', text1Id: error});
};

usbaudioApp.prototype._FolderBrowsingPossibleMsgHandler = function (msg)
{
    log.debug("FolderBrowsingPossibleMsgHandler called... deviceId = " + msg.params.payload.deviceId);
    if (this._connectedDevs.deviceSelected == msg.params.payload.deviceId)
    {
        this._connectedDevs.folderBrowsingPossible = true;

        log.debug("this._connectedDevs.folderBrowsingPossible is ", this._connectedDevs.folderBrowsingPossible);
        if (this._currentContext && this._currentContext.ctxtId && this._currentContextTemplate && this._currentContext.ctxtId == "NowPlaying")
        {
            if (this._connectedDevs.songListCategory == "folder")
            {
                log.info("SongList button set " + !(this._connectedDevs.playbackReady && this._connectedDevs.folderBrowsingPossible));
                this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("SongList", !(this._connectedDevs.playbackReady && this._connectedDevs.folderBrowsingPossible));
            }
            this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("BrowseFolders", !(this._connectedDevs.playbackReady && 
                                                                                                      (this._connectedDevs.folderBrowsingPossible || this._connectedDevs.mdBrowsingPossible)));
        }
    }

    if (msg.params.payload.deviceId == this._connectedDevs.A.deviceId)
    {
        this._connectedDevs.A.folderBrowsingPossible = true;
        log.debug("this._connectedDevs.A.folderBrowsingPossible is ", this._connectedDevs.A.folderBrowsingPossible);
    }
    else if (msg.params.payload.deviceId == this._connectedDevs.B.deviceId)
    {
        this._connectedDevs.B.folderBrowsingPossible = true;
        log.debug("this._connectedDevs.B.folderBrowsingPossible is ", this._connectedDevs.B.folderBrowsingPossible);
    }

    this._enableUSBAudioMenus();
};

usbaudioApp.prototype._MetadataBrowsingPossibleMsgHandler = function (msg)
{
    log.debug("MetadataBrowsingPossibleMsgHandler called... deviceId = " + msg.params.payload.deviceId);
    if (this._connectedDevs.deviceSelected == msg.params.payload.deviceId)
    {
        this._connectedDevs.mdBrowsingPossible = true;

        log.debug("this._connectedDevs.mdBrowsingPossible is ", this._connectedDevs.mdBrowsingPossible);
        if (this._currentContext && this._currentContext.ctxtId && this._currentContextTemplate && this._currentContext.ctxtId == "NowPlaying")
        {
            if (this._connectedDevs.songListCategory == "metadata")
            {
                log.info("SongList button set " + !(this._connectedDevs.playbackReady && this._connectedDevs.mdBrowsingPossible));
                this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("SongList", !(this._connectedDevs.playbackReady && this._connectedDevs.mdBrowsingPossible));
            }
            this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("BrowseFolders", !(this._connectedDevs.playbackReady &&
                                                                                                      (this._connectedDevs.folderBrowsingPossible || this._connectedDevs.mdBrowsingPossible)));
        }
    } 

    if (msg.params.payload.deviceId == this._connectedDevs.A.deviceId)
    {
        this._connectedDevs.A.mdBrowsingPossible = true;
        log.debug("this._connectedDevs.A.mdBrowsingPossible is ", this._connectedDevs.A.mdBrowsingPossible);
    }
    else if (msg.params.payload.deviceId == this._connectedDevs.B.deviceId)
    {
        this._connectedDevs.B.mdBrowsingPossible = true;
        log.debug("this._connectedDevs.B.mdBrowsingPossible is ", this._connectedDevs.B.mdBrowsingPossible);
    }

    this._enableUSBAudioMenus();
};

usbaudioApp.prototype._MltPossibleMsgHandler = function (msg)
{
    log.debug("MltPossibleMsgHandler called... deviceId = " + msg.params.payload.deviceId);
    if (this._connectedDevs.deviceSelected == msg.params.payload.deviceId)
    {
        this._connectedDevs.mltPossible = true;
        log.debug("this._connectedDevs.mltPossible is ", this._connectedDevs.mltPossible);
        
        if (this._currentContext && this._currentContext.ctxtId && this._currentContextTemplate && this._currentContext.ctxtId == "NowPlaying")
        {
            if (this._connectedDevs.songListCategory == "mlt")
            {
                log.info("SongList button set " + !(this._connectedDevs.playbackReady && this._connectedDevs.mltPossible));
                this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("SongList", !(this._connectedDevs.playbackReady && this._connectedDevs.mltPossible));
            }
        }
        var isReady = this._connectedDevs.mltPossible && this._connectedDevs.playbackReady && !this._connectedDevs.endOfListState; 
        this._enableMLT(isReady);
    }

    if (msg.params.payload.deviceId == this._connectedDevs.A.deviceId)
    {
        this._connectedDevs.A.mltPossible = true;
        log.debug("this._connectedDevs.A.mltPossible is ", this._connectedDevs.A.mltPossible);
    }
    else if (msg.params.payload.deviceId == this._connectedDevs.B.deviceId)
    {
        this._connectedDevs.B.mltPossible = true;
        log.debug("this._connectedDevs.B.mltPossible is ", this._connectedDevs.B.mltPossible);
    }
};

usbaudioApp.prototype._SetSongsListIndexMsgHandler = function (msg)
{
	log.debug("_SetSongsListIndexMsgHandler: setting list index for ", msg.params.payload.path, " to ", msg.params.payload.index);
	if(msg && msg.params && msg.params.payload && msg.params.payload.hasOwnProperty("path") && msg.params.payload.path != "Invalid")
	{	
		if(msg && msg.params && msg.params.payload && msg.params.payload.hasOwnProperty("index"))
		{				
		    this._payloadTable[msg.params.payload.path].index = msg.params.payload.index;
		    this._payloadTable[msg.params.payload.path].focused = msg.params.payload.index;
		}
		else
		{
			log.info("Missing index.");
		}
	}
	else
	{
		log.info("Missing path.");
	}
};

usbaudioApp.prototype._DeviceDisabledMsgHandler = function (msg)
{
    log.debug("_DeviceDisabledMsgHandler called");
    if (this._connectedDevs.deviceSelected == msg.params.payload.deviceId)
    {
        this._clearMetadata();
        this._clearTotalElapsedTime();
        this._clearTrackInfo();
    }
    if(this._connectedDevs.A.deviceId == msg.params.payload.deviceId) 
    {
        this._connectedDevs.A.showGracenote = true;
    }
    if(this._connectedDevs.B.deviceId == msg.params.payload.deviceId) 
    {
        this._connectedDevs.B.showGracenote = true;
    }
};

usbaudioApp.prototype._DeviceSelectedMsgHandler = function (msg)
{
    log.debug("_DeviceSelectedMsgHandler called");
    if (this._connectedDevs.deviceSelected != msg.params.payload.deviceId)
    {
        this._clearMetadata();
        this._clearUSBData();
        this._disableUSBAudioMenus();
        this._clearTotalElapsedTime();
        this._clearTrackInfo();
    }

    this._connectedDevs.deviceSelected = msg.params.payload.deviceId;
    var id = 0;
    var name = "";
    var type = "";
    var showGracenote = true;
    var playbackReady = false;
    var folderBrowsingPossible = false;
    var mdBrowsingPossible = false;
    var mltPossible = false;
    var endOfListState = false;
    var songListCategory = "";
    if (this._connectedDevs.A.deviceId == msg.params.payload.deviceId)
    {
    	log.info("Selected device A with button: ", this._connectedDevs.A.currentlyFocussedButton);
        id = 1;
        name = this._connectedDevs.A.name;
        type = this._connectedDevs.A.type;
        showGracenote = this._connectedDevs.A.showGracenote;
        RepeatShuffleReady = this._connectedDevs.A.RepeatShuffleReady;
        playbackReady = this._connectedDevs.A.playbackReady;
        folderBrowsingPossible = this._connectedDevs.A.folderBrowsingPossible;
        mdBrowsingPossible = this._connectedDevs.A.mdBrowsingPossible;
        mltPossible = this._connectedDevs.A.mltPossible;
        endOfListState = this._connectedDevs.A.endOfListState;
        songListCategory = this._connectedDevs.A.songListCategory;
    }
    else if (this._connectedDevs.B.deviceId == msg.params.payload.deviceId)
    {
    	log.info("Selected device B with button: ", this._connectedDevs.B.currentlyFocussedButton);
        id = 2;
        name = this._connectedDevs.B.name;
        type = this._connectedDevs.B.type;
        showGracenote = this._connectedDevs.B.showGracenote;
        RepeatShuffleReady = this._connectedDevs.B.RepeatShuffleReady;
        playbackReady = this._connectedDevs.B.playbackReady;
        folderBrowsingPossible = this._connectedDevs.B.folderBrowsingPossible;
        mdBrowsingPossible = this._connectedDevs.B.mdBrowsingPossible;
        mltPossible = this._connectedDevs.B.mltPossible;
        endOfListState = this._connectedDevs.B.endOfListState;
        songListCategory = this._connectedDevs.B.songListCategory;
    }

    this._connectedDevs.selectedDevType = type;
    this._connectedDevs.showGracenote = showGracenote;
    this._connectedDevs.RepeatShuffleReady = RepeatShuffleReady;
    this._connectedDevs.playbackReady = playbackReady;
    this._connectedDevs.folderBrowsingPossible = folderBrowsingPossible;
    this._connectedDevs.mdBrowsingPossible = mdBrowsingPossible;
    this._connectedDevs.mltPossible = mltPossible;
    this._connectedDevs.endOfListState = endOfListState;
    this._connectedDevs.songListCategory = songListCategory;

    log.debug("this._connectedDevs: deviceSelected = " + this._connectedDevs.deviceSelected + 
             ", showGracenote = " + this._connectedDevs.showGracenote + 
             ", RepeatShuffleReady = " + this._connectedDevs.RepeatShuffleReady +
             ", playbackReady = " + this._connectedDevs.playbackReady + 
             ", folderBrowsingPossible = " + this._connectedDevs.folderBrowsingPossible +
             ", mdBrowsingPossible = " + this._connectedDevs.mdBrowsingPossible +
             ", mltPosssible = " + this._connectedDevs.mltPossible +
             ", endOfListState = " + this._connectedDevs.endOfListState +
             ", songListCategory = " + this._connectedDevs.songListCategory);

    for (var i in this._contextTable)
    {
        if ("ErrorCondition" !== i)
        {
            this._contextTable[i].sbNameSubMap = {deviceId: id, deviceName: name};
            this._contextTable[i].sbNameIcon = "IcnSbnEnt.png";
        }
    }

    if (this._currentContext && this._currentContext.uiaId == "usbaudio" && this._currentContextTemplate)
    {
        framework.common.setSbNameId(this.uiaId, this.uiaId, {deviceId: id, deviceName: name});
    }

    this._enableUSBAudioMenus();
    
    this._setFocussedButton();
};

usbaudioApp.prototype.TimedSbn_ConnectionStatusMsgHandler = function (msg)
{
    if (msg.params.payload.status == "Disconnected")
    {
        if (msg.params.payload.usb == "A")
        {
            this._connectedDevs.A.name = "";
            this._connectedDevs.A.deviceId = null;
            this._connectedDevs.A.type = null;
            this._connectedDevs.A.playbackReady = false;
            this._connectedDevs.A.folderBrowsingPossible = false;
            this._connectedDevs.A.mdBrowsingPossible = false;
            this._connectedDevs.A.mltPossible = false;
            this._connectedDevs.A.endOfListState = false;
            this._connectedDevs.A.showGracenote = true;
            this._connectedDevs.A.RepeatShuffleReady = false;
            if (msg.params.payload.hasOwnProperty("reason"))
            {
                this._connectedDevs.A.connectionReason = msg.params.payload.reason;
            }

            if (msg.params.payload.hasOwnProperty("reason") && (msg.params.payload.reason === "Lang"))
            {
                this._connectedDevs.selId = 0;
                this._connectedDevs.deviceSelected = 0;
                this._connectedDevs.selectedDevType = "";
                this._connectedDevs.playbackReady = false;
                this._connectedDevs.folderBrowsingPossible = false;
                this._connectedDevs.mdBrowsingPossible = false;
                this._connectedDevs.mltPossible = false;
                this._connectedDevs.endOfListState = false;
                this._connectedDevs.showGracenote = true;
                this._connectedDevs.RepeatShuffleReady = false;
            }
            else if (this._connectedDevs.A.connectionReason !== "System")
            {
                var SbnString = "USB1Disconnected";
                // show sbn
                framework.common.startTimedSbn(this.uiaId, 'USBA_ConnectionStatus_Sbn', 'deviceRemoved', {
                    sbnStyle : 'Style02',
                    imagePath1 : 'IcnSbnEnt.png',
                    text1Id : SbnString,
                    text1SubMap: {"usbName": msg.params.payload.name}
                });
            }
        }
        else if (msg.params.payload.usb == "B")
        {
            this._connectedDevs.B.name = "";
            this._connectedDevs.B.deviceId = null;
            this._connectedDevs.B.type = null;
            this._connectedDevs.B.playbackReady = false;
            this._connectedDevs.B.folderBrowsingPossible = false;
            this._connectedDevs.B.mdBrowsingPossible = false;
            this._connectedDevs.B.mltPossible = false;
            this._connectedDevs.B.endOfListState = false;
            this._connectedDevs.B.showGracenote = true;
            this._connectedDevs.B.RepeatShuffleReady = false;
            if (msg.params.payload.hasOwnProperty("reason"))
            {
                this._connectedDevs.B.connectionReason = msg.params.payload.reason;
            }

            if (msg.params.payload.hasOwnProperty("reason") && (msg.params.payload.reason === "Lang"))
            {
                this._connectedDevs.selId = 0;
                this._connectedDevs.deviceSelected = 0;
                this._connectedDevs.selectedDevType = "";
                this._connectedDevs.playbackReady = false;
                this._connectedDevs.folderBrowsingPossible = false;
                this._connectedDevs.mdBrowsingPossible = false;
                this._connectedDevs.mltPossible = false;
                this._connectedDevs.endOfListState = false;
                this._connectedDevs.showGracenote = true;
                this._connectedDevs.RepeatShuffleReady = false;
            }
            else if (this._connectedDevs.B.connectionReason !== "System")
            {
                var SbnString = "USB2Disconnected";
                // show sbn
                framework.common.startTimedSbn(this.uiaId, 'USBB_ConnectionStatus_Sbn', 'deviceRemoved', {
                    sbnStyle : 'Style02',
                    imagePath1 : 'IcnSbnEnt.png',
                    text1Id : SbnString,
                    text1SubMap: {"usbName": msg.params.payload.name}
                });
            }
        }
    }
    else if (msg.params.payload.status == "Connected")
    {
        // show sbn
        if (msg.params.payload.usb == "A")
        {
            this._connectedDevs.A.name = msg.params.payload.name;
            this._connectedDevs.A.deviceId = msg.params.payload.deviceId;
            this._connectedDevs.A.type = msg.params.payload.type;
            if (this._connectedDevs.A.connectionReason === "User")
            {
            	this._connectedDevs.A.currentlyFocussedButton = "source";
                var SbnString = "USB1Connected";
                // show sbn
                framework.common.startTimedSbn(this.uiaId, 'USBA_ConnectionStatus_Sbn', 'deviceConnected', {
                    sbnStyle : 'Style02',
                    imagePath1 : 'IcnSbnEnt.png',
                    text1Id : SbnString,
                    text1SubMap: {"usbName": msg.params.payload.name}
                });
            }
        }
        else if (msg.params.payload.usb == "B")
        {
            this._connectedDevs.B.name = msg.params.payload.name;
            this._connectedDevs.B.deviceId = msg.params.payload.deviceId;
            this._connectedDevs.B.type = msg.params.payload.type;
            if (this._connectedDevs.B.connectionReason === "User")
            {
            	this._connectedDevs.B.currentlyFocussedButton = "source";
                var SbnString = "USB2Connected";
                // show sbn
                framework.common.startTimedSbn(this.uiaId, 'USBB_ConnectionStatus_Sbn', 'deviceConnected', {
                    sbnStyle : 'Style02',
                    imagePath1 : 'IcnSbnEnt.png',
                    text1Id : SbnString,
                    text1SubMap: {"usbName": msg.params.payload.name}
                });
            }
        }
    }
};

usbaudioApp.prototype._SetAppleFriendlyNameMsgHandler = function (msg)
{	
	if (this._connectedDevs.A.deviceId === msg.params.payload.deviceId)
    {
        id = 1;
        this._connectedDevs.A.name = msg.params.payload.name;
        name = this._connectedDevs.A.name;
        log.debug("_SetAppleFriendlyNameMsgHandler A name: ", name);
        
    	if(this._connectedDevs.deviceSelected === msg.params.payload.deviceId)
		{
	        for (var i in this._contextTable)
		    {
		        if ("ErrorCondition" !== i)
		        {
		        	log.debug("_SetAppleFriendlyNameMsgHandler ErrorCondition !== i this._contextTable[i].sbNameSubMap: ",  JSON.stringify(this._contextTable[i].sbNameSubMap), "; id: ", id, "; name: ", name);
		            this._contextTable[i].sbNameSubMap = {deviceId: id, deviceName: name};
		            this._contextTable[i].sbNameIcon = "IcnSbnEnt.png";
                }
		    }
	    
	        if (this._currentContext && this._currentContext.uiaId == "usbaudio" && this._currentContextTemplate)
		    {
		        framework.common.setSbNameId(this.uiaId, this.uiaId, {deviceId: id, deviceName: name});
		    }
	   	 }
    }
    else if (this._connectedDevs.B.deviceId === msg.params.payload.deviceId)
    {
        id = 2;
        this._connectedDevs.B.name = msg.params.payload.name;
        name = this._connectedDevs.B.name;
        log.debug("_SetAppleFriendlyNameMsgHandler B name: ", name);
        
        if(this._connectedDevs.deviceSelected === msg.params.payload.deviceId)
		{
	        for (var i in this._contextTable)
		    {
		        if ("ErrorCondition" !== i)
		        {
		            this._contextTable[i].sbNameSubMap = {deviceId: id, deviceName: name};
		            this._contextTable[i].sbNameIcon = "IcnSbnEnt.png";
		        }
		    }
	    
	        if (this._currentContext && this._currentContext.uiaId == "usbaudio" && this._currentContextTemplate)
		    {		    	
		        framework.common.setSbNameId(this.uiaId, this.uiaId, {deviceId: id, deviceName: name});
		    }
		 }
    }
    else
    {
    	log.info("_SetAppleFriendlyNameMsgHandler NO DEVICE FOUND FOR ID ", msg.params.payload.deviceId);
    }
};

usbaudioApp.prototype._PlaybackStatusMsgHandler = function (msg)
{
    log.debug("_PlaybackStatusMsgHandler called");
    /*
    if (this._scrubberConfig.duration != (msg.params.payload.playbackStatus.length*1000))
    {
        this._scrubberConfig.duration = msg.params.payload.playbackStatus.length*1000;
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId == "NowPlaying")
        {
            this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setScrubberDuration(this._scrubberConfig.duration);
        }
    }
    */

    if (this._connectedDevs.deviceSelected != msg.params.payload.deviceId)
    {
        return ;
    }

    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId == "NowPlaying" && this._umpTotalTime != parseInt(msg.params.payload.trackDuration))
    {
        this._umpSecondaryElapseTime = parseInt(parseInt(msg.params.payload.trackDuration) * this._umpProgressValue);
        this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setElapsedTime(this._secondsToHHMMSS(this._umpSecondaryElapseTime));
    }
    
    //SW00154449 - Ensuring that the play/pause button is in the correct state, while we're playing
   /* if (this._currentContext && this._currentContext.ctxtId && this._currentContextTemplate && this._currentContext.ctxtId == "NowPlaying")
    {
        if(this._umpButtonConfig["playpause"].currentState != "Pause") 
        {
            this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonState("playpause", "Pause");
        }
    }
    else
    {
        this._umpButtonConfig["playpause"].currentState = "Pause";
    }*/

    this._umpTotalTime = parseInt(msg.params.payload.trackDuration);
    this._umpElapseTime = parseInt(msg.params.payload.elapsedTime);
    var progress = Math.round((this._umpElapseTime / this._umpTotalTime)*100)/100;
    log.debug("Updating progress", this._umpTotalTime, this._umpElapseTime, progress);
    
    
    // Update control if context is bound to a template
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId == "NowPlaying" && this._stopElapsedUpdate == false)
    {
        this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setElapsedTime(this._secondsToHHMMSS(this._umpElapseTime));
        this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setTotalTime(this._secondsToHHMMSS(this._umpTotalTime));
        this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.updateScrubber(progress);
    }
    else if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId == "NowPlaying" && this._stopElapsedUpdate == true)
    {
        this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setTotalTime(this._secondsToHHMMSS(this._umpTotalTime));
    }
};

usbaudioApp.prototype._getContextId = function (category)
{
    var contextId = "AllSongs";

    switch(category)
    {
        case this._browseCategory.USBMS_BROWSE_GENRES:
            contextId = "AllGenres";
            break;
        case this._browseCategory.USBMS_BROWSE_ARTISTS:
            contextId = "AllArtists";
            break;
        case this._browseCategory.USBMS_BROWSE_ALBUMS:
            contextId = "AllAlbums";
            break;
        case this._browseCategory.USBMS_BROWSE_ALL_SONGS:
            contextId = "AllSongs";
            break;
        case this._browseCategory.USBMS_BROWSE_ALL_PLAYLISTS:
            contextId = "AllPlaylists";
            break;
        case this._browseCategory.USBMS_BROWSE_PLAYLIST_ENTRIES:
            contextId = "PlaylistSongs";
            break;
        case this._browseCategory.USBMS_BROWSE_GENRE_ARTISTS:
            contextId = "GenreArtists";
            break;
        case this._browseCategory.USBMS_BROWSE_GENRE_ALBUM:
            contextId = "Genre_AllAlbums";
            break;
        case this._browseCategory.USBMS_BROWSE_GENRE_ARTIST_ALBUM:
            contextId = "Genre_ArtistAlbums";
            break;
        case this._browseCategory.USBMS_BROWSE_ARTIST_ALBUMS:
            contextId = "ArtistAlbums";
            break;
        case this._browseCategory.USBMS_BROWSE_ALBUM_ARTIST:
            contextId = "AlbumsDisambiguate";
            break;
        case this._browseCategory.USBMS_BROWSE_ALBUM_SONGS:
            contextId = "AlbumSongs";
            break;
        case this._browseCategory.USBMS_BROWSE_ALBUM_ARTIST_SONGS:
            contextId = "AlbumsDisambiguateSongs";
            break;
        case this._browseCategory.USBMS_BROWSE_ARTIST_ALBUM_SONGS:
            contextId = "Artist_AlbumSongs";
            break;
        case this._browseCategory.USBMS_BROWSE_ARTIST_SONGS:
            contextId = "Artist_AllSongs";
            break;
        case this._browseCategory.USBMS_BROWSE_GENRE_ARTIST_ALBUM_SONGS:
            contextId = "Genre_Artist_AlbumSongs";
            break;
        case this._browseCategory.USBMS_BROWSE_GENRE_ARTIST_SONGS:
            contextId = "Genre_Artist_AllSongs";
            break;
        case this._browseCategory.USBMS_BROWSE_GENRE_ALBUM_SONGS:
            contextId = "Genre_AllAlbums_AlbumSongs";
            break;
        case this._browseCategory.USBMS_BROWSE_GENRE_SONGS:
            contextId = "Genre_AllAlbums_AllSongs";
            break;
        case this._browseCategory.USBMS_BROWSE_ALL_CONTENTS_IN_FOLDER:
            contextId = "FolderSongs";
            break;
        case this._browseCategory.USBMS_BROWSE_ALL_SUBFOLDER_ENTRIES_IN_FOLDER:
            contextId = "FolderAllSongs";
            break;
        case this._browseCategory.USBMS_BROWSE_PODCASTS:
            contextId = "Podcasts";
            break;
        case this._browseCategory.USBMS_BROWSE_PODCAST_SONGS:
            contextId = "PodcastEpisodes";
            break;
        case this._browseCategory.USBMS_BROWSE_AUDIOBOOKS:
            contextId = "Audiobooks";
            break;
        case this._browseCategory.USBMS_BROWSE_AUDIOBOOKS_CHAPTERS:
            contextId = "AudiobookChapters";
            break;
        default :
            contextId = "AllSongs";
            break;
    }

    log.debug("contextId = " + contextId);
    return contextId;
};

usbaudioApp.prototype._NowPlayingDataMsgHandler = function (msg)
{
    log.debug("Inside _NowPlayingDataMsgHandler with msg : ", JSON.stringify(msg));
    if (!this._currentContext){
    	log.error('No this._currentContext !!!');
    }
    else 
    {
    	log.debug('this._currentContext.ctxtId', this._currentContext.ctxtId);
    }
    
    this._connectedDevs.playbackReady = true;
    this._connectedDevs.RepeatShuffleReady = true;
    if (this._connectedDevs.deviceSelected == this._connectedDevs.A.deviceId)
    {
        log.debug("update this._connectedDevs.A");
        this._connectedDevs.A.playbackReady = true;
        this._connectedDevs.A.RepeatShuffleReady = true;
    }
    else if (this._connectedDevs.deviceSelected == this._connectedDevs.B.deviceId)
    {
        log.debug("update this._connectedDevs.B");
        this._connectedDevs.B.playbackReady = true;
        this._connectedDevs.B.RepeatShuffleReady = true;
    }

    var filterEnum = this._browseCategory.USBMS_BROWSE_ALL_SONGS;
    var idLevel1 = this._objectId.USBMS_ObjectID_Invalid;
    var idLevel2 = this._objectId.USBMS_ObjectID_Invalid;
    var idLevel3 = this._objectId.USBMS_ObjectID_Invalid;
    var playListName = "";
    if (msg && msg.params && msg.params.payload && 
        msg.params.payload.hasOwnProperty("filters") && msg.params.payload.filters)
    {
        filterEnum = msg.params.payload.filters.filterEnum;
        idLevel1 = msg.params.payload.filters.idLevel1;
        idLevel2 = msg.params.payload.filters.idLevel2;
        idLevel3 = msg.params.payload.filters.idLevel3;

        playListName = msg.params.payload.playListName;

        this._trackInfo.trackId = msg.params.payload.trackId;
        this._trackInfo.trackIdOffSetInList = msg.params.payload.trackIdOffSetInList;
    }

    if (!this._currentContextId)
    {
        this._currentContextId = this._getContextId(filterEnum);
        log.debug("Set this._currentContextId = " + this._currentContextId);
    }
    this._setSongListCategory(filterEnum, playListName);
    this._setFilter(filterEnum, idLevel1, idLevel2, idLevel3);

    // In the case of UMASS and MTP, playback and folder browsing become possible at the same time.
    // get current folder name and update screen title
    this._appsdkGetCurrentFolderItems(filterEnum, idLevel1, "getFolderName", false);

    // set repeatMode and shuffleMode
    this._cacheRepeatShuffleState = {repeat:"USBM_REPEAT_MODE_NONE", shuffle:"USBM_SHUFFLE_MODE_NONE"};
    if (msg && msg.params && msg.params.payload && msg.params.payload.repeatMode && msg.params.payload.shuffleMode)
    {
        this._cacheRepeatShuffleState.repeat = msg.params.payload.repeatMode;    
        this._cacheRepeatShuffleState.shuffle = msg.params.payload.shuffleMode;    
    }
    if (this._currentContext && this._currentContext.ctxtId && this._currentContextTemplate && this._currentContext.ctxtId == "NowPlaying")
	{
        // enable NowPlaying context
        this._PlaybackReady(true);

        this._updateUmpButtons(this._currentContextTemplate, this._cacheRepeatShuffleState);
    }
};

usbaudioApp.prototype._ObjectInfoMsgHandler = function (msg)
{
    this._trackInfo.trackId = msg.params.payload.trackIndex;
    this._trackInfo.trackIdOffSetInList = msg.params.payload.trackIdOffSetInList;
    this._cachedSongDetails.genre = msg.params.payload.genre;
    this._cachedSongDetails.artist = msg.params.payload.artist;
    this._cachedSongDetails.title = msg.params.payload.title;
    this._cachedSongDetails.album = msg.params.payload.album;
    this._stopElapsedUpdate = false;

    // Update control if context is bound to a template
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId && this._currentContext.ctxtId == "NowPlaying")
    {
        clearTimeout(this._finalAdjustmentTimeout);
        this._finalAdjustmentTimeout = null;
        this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.releaseScrubber(0);
        this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setElapsedTime(this._secondsToHHMMSS(0));
        this._populateNowPlayingCtrl(this._currentContextTemplate, this._cachedSongDetails);
        if (this._connectedDevs.mltPossible == true && this._connectedDevs.playbackReady == true && !this._connectedDevs.endOfListState)
        {
            this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("GenerateMoreLikeThis", 
                                                                                   !(this._connectedDevs.mltPossible && this._connectedDevs.playbackReady && !this._connectedDevs.endOfListState));
            if (this._connectedDevs.showGracenote == true)
            {
                this._currentContextTemplate.nowPlaying4Ctrl.setDetailLine3({detailText: "Powered By Gracenote®"});
                this._gracenoteTimeout = setTimeout(this._removeGracenote.bind(this), this._gracenoteTimeoutTime);
            }
        }
    }
};

usbaudioApp.prototype._ClearTrackMetadataMsgHandler = function (msg)
{
    log.debug("ClearTrackMetadataMsgHandler called");
	this._clearMetadata();
	this._clearTotalElapsedTime();
    this._enableMLT(false); 
    this._connectedDevs.endOfListState = true;
    if (this._connectedDevs.deviceSelected == this._connectedDevs.A.deviceId)
    {
        this._connectedDevs.A.endOfListState = true;
    }
    else
    {
        this._connectedDevs.B.endOfListState = true;
    }
};

usbaudioApp.prototype._SendScreenTitleMsgHandler = function (msg)
{
    var screenTitle = "";
    if (msg && msg.params && msg.params.payload && msg.params.payload.hasOwnProperty("category") && 
        msg.params.payload.hasOwnProperty("screenTitle") && msg.params.payload.screenTitle)
    {
        // screenTitle is playlistName or folderName
        screenTitle = msg.params.payload.screenTitle;
        var category = msg.params.payload.category;

        if ((this._browseCategory.USBMS_BROWSE_ALL_CONTENTS_IN_FOLDER == category) || 
            (this._browseCategory.USBMS_BROWSE_ALL_SUBFOLDER_ENTRIES_IN_FOLDER == category))
        {
            if (!(/\/$/.test(msg.params.payload.screenTitle)))
            {
                screenTitle = msg.params.payload.screenTitle + "/";
            }
        }
        else if ((this._browseCategory.USBMS_BROWSE_ALL_PLAYLISTS == category) || 
                 (this._browseCategory.USBMS_BROWSE_PLAYLIST_ENTRIES == category))
        {
            if (screenTitle.toLowerCase() == 'more like this')
            {
                screenTitle = framework.localize.getLocStr('usbaudio', 'common.Tooltip_IcnUmpMore');
            }
            else if (!this._isAppleDevice(this._connectedDevs.selectedDevType))
            {
                screenTitle = this._removeExtention(screenTitle);
            }
        }
    }

    this._cachedSongDetails.screenTitle = screenTitle;
    if (this._currentContext && this._currentContext.ctxtId == "NowPlaying" && this._currentContextTemplate)
    {
        log.debug('this._currentContext.ctxtId', this._currentContext.ctxtId);
        this._currentContextTemplate.nowPlaying4Ctrl.setCtrlTitle({ctrlTitleText: screenTitle});
    }
    else
    {
        log.debug('No this._currentContext !!!');
    }
};

usbaudioApp.prototype._TimedSbn_CurrentSongMsgHandler = function (msg)
{
    framework.common.startTimedSbn(this.uiaId, 'TimedSbn_UsbAudio_CurrentSong', 'typeE', {
        sbnStyle : 'Style02',
        imagePath1 : 'IcnSbnEnt.png',
		text1 : "USB",
        text2 : msg.params.payload.title,
    });
};

usbaudioApp.prototype._PlayerStateMsgHandler = function (msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.playerState)
    {
        switch(msg.params.payload.playerState) {
        case "PAUSE":
        case "STOPED":
            this._changePlayButton("Play");
            break;
        case "PLAY":
            this._changePlayButton("Pause");
            break;
        default :
            log.warn("Incorrect player state "+msg.params.payload.playerState);
            break;
        }

        // after playcomplete, mlt button is enabled 
        if (this._connectedDevs.endOfListState == true)
        {
            this._connectedDevs.endOfListState = false;
            if (this._connectedDevs.deviceSelected == this._connectedDevs.A.deviceId)
            {
                this._connectedDevs.A.endOfListState = false;
            }
            else
            {
                this._connectedDevs.B.endOfListState = false;
            }

            if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId == "NowPlaying")
            {
                this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("GenerateMoreLikeThis", 
                                                                                       !(this._connectedDevs.mltPossible && this._connectedDevs.playbackReady && !this._connectedDevs.endOfListState));
            }
        }
    }
};
usbaudioApp.prototype._changePlayButton = function(nextButtonStatus) 
{
    log.debug("_changePlayButton called");
    console.log("ENTER _changePlayButton, value:[" +nextButtonStatus+ "]");
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId == "NowPlaying")
    {
        this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonState("playpause", nextButtonStatus);
    }
    this._umpButtonConfig["playpause"].currentState = nextButtonStatus;
};

usbaudioApp.prototype._CoverArtMsgHandler = function (msg)
{
    this._cachedSongDetails.coverArt = msg.params.payload.path;
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId == "NowPlaying")
    {
        this._populateCoverArt(this._currentContextTemplate, this._cachedSongDetails);
    }
};

usbaudioApp.prototype._RepeatShuffleStatusMsgHandler = function (msg)
{
    this._cacheRepeatShuffleState = msg.params.payload;
    
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId && this._currentContext.ctxtId == "NowPlaying")
    {
        this._updateUmpButtons(this._currentContextTemplate, this._cacheRepeatShuffleState);
    }
};

usbaudioApp.prototype._PlayRequest = function (msg)
{
    log.debug("PlayRequest called msg = " + JSON.stringify(msg) + " currentContextId = " + this._currentContextId );
    // count using path and metadata
    this._selectData(msg, true);
};

usbaudioApp.prototype._BrowsePlayRequestMsgHandler = function (msg)
{
    this._appsdkGetFolderItems(msg.params.payload.folderId, msg.params.payload.folderName, this._viewType.list, 0, null, "play", true);
};

usbaudioApp.prototype._BrowseArtistDisambiguate = function (msg)
{
	log.debug('_BrowseArtistDisambiguate');
    this._countAlbums(msg.params.payload.artistName, "browse", msg.params.payload.artistId, true, "BrowseArtistDisambiguate");
};

usbaudioApp.prototype._BrowseAlbumDisambiguate = function (msg)
{
	log.debug('_BrowseAlbumDisambiguate');
    if ((this._currentContext &&
        this._currentContext.hasOwnProperty("params") &&
        this._currentContext.params.hasOwnProperty("payload") &&
        this._currentContext.params.payload.hasOwnProperty("path") &&
        this._currentContext.params.payload.path != "Genre_ArtistAlbums" &&
        this._currentContext.params.payload.path != "GenresAllArtists_ArtistAlbums" &&
        this._currentContext.params.payload.path != "ArtistAlbums") ||
        (!this._currentContext) ||
        (this._currentContext.ctxtId == "USBAudio") || (this._currentContext.ctxtId == "NowPlaying") || (this._currentContext.ctxtId == "Folders"))
    {
        this._countArtists(msg.params.payload.albumName, msg.params.payload.albumId, "browse", true, "BrowseAlbumDisambiguate");
    }
    else if (this._isAppleDevice(this._connectedDevs.selectedDevType))
    {
            var artistName = this._currentContext.params.payload.metadata.artistName;
            var artistId = this._currentContext.params.payload.metadata.artistId;
            var genreName = this._currentContext.params.payload.metadata.genreName;
            var genreId = this._currentContext.params.payload.metadata.genreId;

            this._convertAlbumId(msg.params.payload.albumName,
                                "Browse",
                                artistName, artistId,
                                genreName, genreId,
                                true,
                                this._currentContextId,
                                0);
    }
    else
    {
        framework.sendEventToMmui(this.uiaId, "BrowseAlbumArtist", {payload:{albumName: msg.params.payload.albumName, albumId: msg.params.payload.albumId}}, true);
    }
};

usbaudioApp.prototype._createAlbumDisambiguateMdInfo = function (artistName, artistId, albumName, albumId, genreName, genreId)
{
    var md_info = [{type: this._mdFilter.USBM_MetadataType_AlbumName, value: albumName, item_id: albumId}];

    if (artistName && (artistId || artistId == 0))
    {
        md_info.push({type: this._mdFilter.USBM_MetadataType_ArtistName, value: artistName, item_id: artistId});
    }
    if (genreName && (genreId || genreId == 0))
    {
        md_info.push({type: this._mdFilter.USBM_MetadataType_GenreName, value: genreName, item_id: genreId});
    }

    return md_info;
}

usbaudioApp.prototype._PlayAlbumDisambiguate = function (msg)
{
	log.debug('_PlayAlbumDisambiguate');

    if (msg.params.payload.hasOwnProperty("path") && msg.params.payload.path)
    {
        this._currentContextId = msg.params.payload.path;
    }

    if ((this._currentContext &&
        this._currentContext.hasOwnProperty("params") &&
        this._currentContext.params.hasOwnProperty("payload") &&
        this._currentContext.params.payload.hasOwnProperty("path") &&
        this._currentContext.params.payload.path != "Genre_ArtistAlbums" &&
        this._currentContext.params.payload.path != "GenresAllArtists_ArtistAlbums" &&
        this._currentContext.params.payload.path != "ArtistAlbums") || (!this._currentContext))
        {
            this._countArtists(msg.params.payload.albumName, msg.params.payload.albumId, "play", true, "PlayAlbumDisambiguate");
        }
        else if (this._currentContext && (!this._currentContext.params.hasOwnProperty("payload") || !this._currentContext.params.payload.hasOwnProperty("path")))
        {
            this._countArtists(msg.params.payload.albumName, msg.params.payload.albumId, "play", true, "PlayAlbumDisambiguate");
        }
        else
        {
            var artistName = this._currentContext.params.payload.metadata.artistName;
            var artistId = this._currentContext.params.payload.metadata.artistId;
            var genreName = this._currentContext.params.payload.metadata.genreName;
            var genreId = this._currentContext.params.payload.metadata.genreId;
            if (this._isAppleDevice(this._connectedDevs.selectedDevType))
            {
                this._convertAlbumId(msg.params.payload.albumName,
                                    "play",
                                    artistName, artistId,
                                    genreName, genreId,
                                    true,
                                    this._currentContextId,
                                    0);
            }
            else
            {
                var md_info = this._createAlbumDisambiguateMdInfo(artistName, artistId,
                                                                  msg.params.payload.albumName, msg.params.payload.albumId,
                                                                  genreName, genreId);

                var contextPath = this._playDisambiguatePathTable[this._currentContextId];
                if (!contextPath)
                {
                    contextPath = "PlayAlbumDisambiguate";
                }

                // make selection and play songs
                this._SelectSongsAndPlay(
                    [this._mdFilter.USBM_MetadataType_ObjectName],
                    md_info,
                    [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}], true, contextPath);
            }
        }
};

usbaudioApp.prototype._UserIntentMsgHandler = function (msg)
{
    if (msg.params.payload.intent == "Invalid")
    {
        this._userIntent = "Browse";
    }
    else
    {
        this._userIntent = msg.params.payload.intent;
    }
};

usbaudioApp.prototype._BrowseArtistAlbumsInfoMsgHandler = function (msg)
{
    log.debug('BrowseArtistAlbumsInfoMsgHandler');
    if (msg && msg.params && msg.params.payload && msg.params.payload.hasOwnProperty("path") && 
        msg.params.payload.hasOwnProperty("genreId") && msg.params.payload.hasOwnProperty("artistId"))
    {
        this._countArtistAlbums(msg.params.payload.path, msg.params.payload.genreId, msg.params.payload.artistId);
    }
    else
    {
        log.warn("message is empty");
    }
};

/******************************
 * APPSDK Requests
 ******************************/
usbaudioApp.prototype._requestList = function (filterList, offset, dataList, contextName, fromVui)
{
    log.debug("_requestList called filter = " + JSON.stringify(filterList) + " offset = " + offset + " contextName = " + contextName);
   
    // playListName is for MLT 
    var playListName = "";
    if (this._currentContextId == "PlaylistSongs")
    {
        playListName = this._payloadTable[this._currentContextId].md_info.playlist.value;
    }

	var params = {
		"browseContext":{
		    "deviceId": this._connectedDevs.deviceSelected,
		    "filterList": {
                "filter": filterList
            },
            "playListName": playListName,
		    "offset": offset,
            "count": this._listStatus.requestSize
        }, 
		"browseContext_sz": {
            "filterList_sz": {
                "filter_sz": filterList.length
            }
        }
	};


    log.debug("params = " + JSON.stringify(params));
    framework.sendRequestToAppsdk(this.uiaId, this._appsdkCallback.bind(this, offset, dataList, contextName, filterList, fromVui), "usbms", "BrowseContext", params);
};

usbaudioApp.prototype._appsdkGetFolderItems = function (folderId, folderName, viewType, index, dataList, action, fromVui)
{
    log.debug("_appsdkGetFolderItems called currentContextId = " + this._currentContextId + ", folderId = " + folderId + ", folderName = " + folderName + 
             ", viewType = " + viewType + ", offset = " + index + ", action = " + action);

    if (folderId == undefined || viewType == undefined)
    {
        log.warn("Missing folderId or viewType");
    }

    var get_num_items = this._listStatus.requestSize;
    // temporary request all items. Until BLM fix totalCount issue
    if (action != "play")
    {
        get_num_items = this._listStatus.requestSize;
    }
    else
    {
        get_num_items = 1;
    }

    var filter = this._createFilter(this._currentContextId, folderId);

	var params = {
		"browseContext":{
		    "deviceId": this._connectedDevs.deviceSelected,
		    "filterList": {
                "filter": [filter]
            },
            "playListName": "",
		    "offset": index,
            "count": get_num_items
        }, 
		"browseContext_sz": {
            "filterList_sz": {
                "filter_sz": [filter].length
            }
        }
	};

    log.debug("params = " + JSON.stringify(params));
    framework.sendRequestToAppsdk(this.uiaId, this._getItemsCallback.bind(this, index, dataList, action, filter, fromVui, viewType, folderName), "usbms", "BrowseContext", params);
};

// request alphabet and its letters indexes
usbaudioApp.prototype._requestLetterIndexing = function (filterList, contextRequested)
{
    log.debug("_requestLetterIndexing called");

	var params = {
		"getAlphabet":{
		    "deviceId": this._connectedDevs.deviceSelected,
		    "filterList": {
                "filter": filterList
            }
        }, 
		"getAlphabet_sz": {
            "filterList_sz": {
                "filter_sz": filterList.length
            } 
        }
	};

	log.debug("_requestLetterIndexing; deviceId: ", params.getAlphabet.deviceId, "; filter: ", JSON.stringify(filterList));
    framework.sendRequestToAppsdk(this.uiaId, this._letterIndexingCallback.bind(this, contextRequested), "usbms", "GetAlphabet", params);
};

usbaudioApp.prototype._appsdkGetCurrentFolderItems = function (browsingCategory, currentFolderId, action, fromVui)
{
    log.debug("_appsdkGetCurrentFolderItems called currentContextId = " + this._currentContextId + ", browsingCategory = " + browsingCategory + 
              ", currentFolderId = " + currentFolderId + ", action = " + action);

    if ((this._browsingTable["FolderSongs"].browseCategory != browsingCategory) && 
        (this._browsingTable["FolderAllSongs"].browseCategory != browsingCategory))
    {
        return;
    }

    var folderId = currentFolderId;
    if (currentFolderId == 0 || currentFolderId == this._objectId.USBMS_ObjectID_Invalid)
    {
        folderId = 1;
    }

    // do not use USBMS_BROWSE_ALL_SUBFOLDER_ENTRIES_IN_FOLDER.
    // USBMS_BROWSE_ALL_SUBFOLDER_ENTRIES_IN_FOLDER can not get parent folder id(always 0).
    var filterList = new Array();
    filterList.push({
                  filterEnum: this._browsingTable["FolderSongs"].browseCategory,
                  idLevel1: folderId, 
                  idLevel2: this._objectId.USBMS_ObjectID_Invalid, 
                  idLevel3: this._objectId.USBMS_ObjectID_Invalid, 
                  sortOrder: this._browsingTable["FolderSongs"].sortOrder
    });

	var params = {
		"getBrowseFolderInfo":{
		    "deviceId": this._connectedDevs.deviceSelected,
		    "filterList": {
                "filter": filterList
            },
            "itemId": folderId
        }, 
		"getBrowseFolderInfo_sz": {
            "filterList_sz": {
                "filter_sz": filterList.length
            }
        }
	};

    log.debug("params = " + JSON.stringify(params));
    framework.sendRequestToAppsdk(this.uiaId, this._getFolderItemsCallback.bind(this, folderId, action, fromVui), "usbms", "GetBrowseFolderInfo", params);
};

/******************************
 * APPSDK Callbacks
 ******************************/
usbaudioApp.prototype._appsdkCallback = function (offset, dataList, context, filterList, fromVui, params)
{
    log.debug("_appsdkCallback called paramas = " + JSON.stringify(params));
    if (params.msgType == "methodResponse")
    {
        if ((this._currentContext && this._currentContextTemplate && this._currentContext.hasOwnProperty("params") &&
            this._currentContext.params.hasOwnProperty("payload") && this._currentContext.params.payload.hasOwnProperty("path") &&
            this._currentContext.params.payload.path == context) || (context == "AlbumBrowseDisambiguation") || (context == "AlbumPlayDisambiguation"))
        {
            this._populateList(this._currentContextTemplate, params, this._currentContext.ctxtId, dataList, offset);
            if (context == "AlbumBrowseDisambiguation" || context == "AlbumPlayDisambiguation" ||
                (this._payloadTable[this._currentContext.params.payload.path].hasLetterIndexing == true &&
                this._currentContextTemplate.list2Ctrl.letterIndex &&
                (!this._currentContextTemplate.list2Ctrl.letterIndex.getElementsByTagName('li').length)))
                {
                    // ask BLM for alphabet and indexes of the letters
                    log.info("appsdk callback context: ", context);
                    this._requestLetterIndexing(filterList, context);
                }
        }
        else
        {
            log.debug("USBUADIO: received appsdk response is not for this context", context);
        }
    }
    else if (params.msgType == "methodErrorResponse")
    {
        log.error("requestList : BrowseContext request failed!");
        if (this._currentContextTemplate.hasOwnProperty("list2Ctrl") && this._currentContextTemplate.list2Ctrl.setLoading && this._currentContextTemplate.list2Ctrl.inLoading)
        {
            this._currentContextTemplate.list2Ctrl.setLoading(false);
        }

        framework.sendEventToMmui(this.uiaId, "SelectRootFolder");
    }
};

usbaudioApp.prototype._letterIndexingCallback = function (context, params)
{
    log.debug("_letterIndexingCallback called params = " + JSON.stringify(params));
    if (params.msgType == "methodResponse")
    {
        if (this._currentContext && this._currentContext.ctxtId &&
        	this._contextTable[this._currentContext.ctxtId].controlProperties.hasOwnProperty("List2Ctrl") &&
            this._contextTable[this._currentContext.ctxtId].controlProperties["List2Ctrl"]["hasLetterIndex"] == true &&
            (this._currentContext.hasOwnProperty("params") && this._currentContext.params.hasOwnProperty("payload") &&
            this._currentContext.params.payload.hasOwnProperty("path") && this._currentContext.params.payload.path == context) ||
            (context == "AlbumBrowseDisambiguation") || (context == "AlbumPlayDisambiguation"))
            {
                this._setContextLetterIndexing(params.params.getAlphabetReply.item);
            }
            else
            {
                log.debug("USBAUDIO: alphabet response is not for this context", context);
            }
    }
    else if (params.msgType == "methodErrorResponse")
    {
        log.error("USBAUDIO: GetAlphabet appsdk request failed");
        if (this._currentContext && this._currentContext.ctxtId &&
        	this._contextTable[this._currentContext.ctxtId].controlProperties.hasOwnProperty("List2Ctrl") &&
        	this._contextTable[this._currentContext.ctxtId].controlProperties["List2Ctrl"]["hasLetterIndex"] == true)
            {
                log.debug("USBAUDIO: GetAlphabet request failed!");
            }

        framework.sendEventToMmui(this.uiaId, "SelectRootFolder");
    }
};

usbaudioApp.prototype._getItemsCallback = function (index, dataList, action, filter, fromVui, viewType, folderName, params)
{
    log.debug("_getItemsCallback called filter = " + JSON.stringify(filter));
    if (params.msgType == "methodResponse")
    {
        if (action == "browse")
        {
            log.debug("this._currentContext.ctxtId = ", this._currentContext.ctxtId);
            this._populateList(this._currentContextTemplate, params, this._currentContext.ctxtId, dataList, index, viewType, filter.idLevel1, folderName);
            this._appsdkGetCurrentFolderItems(filter.filterEnum, filter.idLevel1, action, fromVui);
        }
        else if (action == "play")
        {
            this._clearMetadata();
            this._clearTotalElapsedTime();
            this._setSongListCategory(filter.filterEnum, null);
            framework.sendEventToMmui(this.uiaId, "PlaySongIndex", {payload:{filter: filter, objectId: 0}}, params.fromVui);
        }
        else
        {
            log.error("action do not exist.");
        }
    }
    else if (params.msgType == "methodErrorResponse")
    {
        log.error("appsdkGetFolderItem : BrowseContext request failed!");
        if (this._currentContextTemplate.hasOwnProperty("list2Ctrl") && this._currentContextTemplate.list2Ctrl.setLoading && this._currentContextTemplate.list2Ctrl.inLoading)
        {
            this._currentContextTemplate.list2Ctrl.setLoading(false);
        }

        framework.sendEventToMmui(this.uiaId, "SelectRootFolder");
    }
};

usbaudioApp.prototype._getFolderItemsCallback = function (folderId, action, fromVui, params)
{
    log.debug("_getFolderItemsCallback called params = " + JSON.stringify(params));
    if (params.msgType == "methodResponse")
    {
        if (params.params.getBrowseFolderInfoReply && params.params.getBrowseFolderInfoReply.result == 0)
        {
            if (action == "getFolderName")
            {
                var folderName = "/";
                if (folderId > 1)
                {
                    folderName = params.params.getBrowseFolderInfoReply.folderName + "/";
                }
                this._cachedSongDetails.screenTitle = folderName;
                if (this._currentContext && this._currentContext.ctxtId == "NowPlaying" && this._currentContextTemplate)
                {
                    this._currentContextTemplate.nowPlaying4Ctrl.setCtrlTitle({ctrlTitleText: folderName});
                }
            }
            else
            {
                var parentId = params.params.getBrowseFolderInfoReply.parentId;
                var parentName = params.params.getBrowseFolderInfoReply.parentName;
                var folderName = params.params.getBrowseFolderInfoReply.folderName;
                // set root folder info
                if (parentId == this._objectId.USBMS_ObjectID_Invalid || parentId == 0 || parentId == 1)
                {
                    parentId = 1;
                    parentName = "/";
                }
                if (folderId == 1)
                {
                    folderName = "/";
                }
                log.debug("parent_id = " + parentId + ", parentName = " + parentName + ", folderId = " + folderId + ", folderName = " + folderName);
                framework.sendEventToMmui(this.uiaId, "BrowseParentId", {payload:{parentId: parentId, parentName: parentName, folderId: folderId, folderName: folderName}}, fromVui);
            }
        }
    }
    else if (params.msgType == "methodErrorResponse")
    {
        log.error("appsdkGetParentFolderItem : BrowseContext request failed!");
        if (this._currentContextTemplate.hasOwnProperty("list2Ctrl") && this._currentContextTemplate.list2Ctrl.setLoading && this._currentContextTemplate.list2Ctrl.inLoading)
        {
            this._currentContextTemplate.list2Ctrl.setLoading(false);
        }

        framework.sendEventToMmui(this.uiaId, "SelectRootFolder");
    }
};

usbaudioApp.prototype._countArtistAlbumsCallback = function (fromVui, params)
{
    log.debug("_countArtistAlbumsCallback");
    if (params.msgType == "methodResponse")
    {
        var totalCount = 0;
 
        if(!params.params.browseContextReply.hasOwnProperty("itemList") || params.params.browseContextReply.itemList.length == 0 
           || params.params.browseContextReply.totalCount == 0)
        {
            log.info("Empty list!!!");
        }
        else
        {
            totalCount = params.params.browseContextReply.totalCount;
        }

        framework.sendEventToMmui(this.uiaId, "BrowseArtistAlbumCount", {payload:{albumCount: totalCount}}, fromVui);
    }
    else if (params.msgType == "methodErrorResponse")
    {
        log.error("USBAUDIO: BrowseContext request failed!");
        if (this._currentContextTemplate.hasOwnProperty("list2Ctrl") && this._currentContextTemplate.list2Ctrl.setLoading && this._currentContextTemplate.list2Ctrl.inLoading)
        {
            this._currentContextTemplate.list2Ctrl.setLoading(false);
        }

        framework.sendEventToMmui(this.uiaId, "SelectRootFolder");
    }
};

/******************************
 * Helper Functions
 ******************************/
usbaudioApp.prototype._PlaybackReady = function (isReady)
{
    log.debug("_PlaybackReady called isReady = ", isReady);
    this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setBuffering(!isReady);

    var possible = false;
    if (this._connectedDevs.songListCategory == "folder")
    {
        possible = this._connectedDevs.folderBrowsingPossible;
    }
    else if (this._connectedDevs.songListCategory == "metadata")
    {
        possible = this._connectedDevs.mdBrowsingPossible;
    }
    else if (this._connectedDevs.songListCategory == "mlt")
    {
        possible = this._connectedDevs.mltPossible;
    }
    log.debug("SongList button set " + !(isReady && possible));
    this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("SongList", !(isReady && possible));
    this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("BrowseFolders", !(isReady && (this._connectedDevs.folderBrowsingPossible || this._connectedDevs.mdBrowsingPossible)));
    this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("repeat", !(isReady && this._connectedDevs.RepeatShuffleReady));
    this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("shuffle", !(isReady && this._connectedDevs.RepeatShuffleReady));
    this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("prev", !isReady);
    this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("playpause", !isReady);
    this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("next", !isReady);

    if (isReady)
    {
    	log.info("Playback is ready!");
        this._currentContextTemplate.nowPlaying4Ctrl.setAudioTitle({audioTitleText: "", audioTitleIcon:"", audioTitleId: ""});
        this._populateNowPlayingCtrl(this._currentContextTemplate, this._cachedSongDetails);
    }
    else
    {
    	log.info("Playback is not ready!");    	
        this._currentContextTemplate.nowPlaying4Ctrl.setAudioTitle({audioTitleText: "", audioTitleIcon:"none", audioTitleId: "common.Loading"});
        this._currentContextTemplate.nowPlaying4Ctrl.setDetailLine1({detailText: "", detailIcon: "none"});
        this._currentContextTemplate.nowPlaying4Ctrl.setDetailLine2({detailText: "", detailIcon: "none"});
        this._currentContextTemplate.nowPlaying4Ctrl.setCtrlTitle({ctrlTitleText: ""});
        this._currentContextTemplate.nowPlaying4Ctrl.setArtworkImagePath();
    }
};

usbaudioApp.prototype._RepeatShuffleReady = function (isReady)
{
	log.debug("_RepeatShuffleReady");
    this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("repeat", !isReady);
    this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("shuffle", !isReady);
};

usbaudioApp.prototype._jumpToPosition = function ()
{
	log.debug("_jumpToPosition");
    this._stopElapsedUpdate = false;
    this._umpElapseTime = parseInt(this._umpTotalTime * this._umpProgressValue);
    var percent = Math.round(this._umpProgressValue*100);
    framework.sendEventToMmui(this.uiaId, "PlaybackJumpToPosition", {payload:{percent: percent}});
};

usbaudioApp.prototype._contextReadyAction = function (captureData)
{
    if (this._hasContextPayload() &&
        this._currentContext.params.payload.hasOwnProperty("path") &&
        this._currentContext.params.payload.path != "Invalid")
        {
            if (captureData)
            {
                this._topItemOptions.setTopItem = true;
                this._topItemOptions.top = captureData.templateContextCapture.controlData.topItem;
                this._topItemOptions.focus = captureData.templateContextCapture.controlData.focussedItem;
            }

            this._createRequest();
        }
        else if (this._currentContextTemplate.hasOwnProperty("list2Ctrl") && this._currentContextTemplate.list2Ctrl.setLoading && this._currentContextTemplate.list2Ctrl.inLoading)
        {
            this._currentContextTemplate.list2Ctrl.setLoading(false);
        }
};

usbaudioApp.prototype._presetContextConfig = function ()
{
    if (this._hasContextPayload() &&
        this._currentContext.params.payload.hasOwnProperty("path") &&
        this._currentContext.params.payload.path != "Invalid")
        {
            this._setTopItem();
            this._setLetterIndexing();
            this._setTitle();
            if (this._payloadTable[this._currentContextId].hasOwnProperty("md_info") && this._payloadTable[this._currentContextId].md_info)
            {
                this._setIdLevel(this._payloadTable[this._currentContextId].md_info);
            }
        }
        else if (this._hasContextPayload() &&
        this._currentContext.params.payload.hasOwnProperty("path") &&
        this._currentContext.params.payload.path == "Invalid")
        {
            log.warn("USBAUDIO: context change with invalid path!", this._currentContext.ctxtId);
        }
        else
        {
            log.warn("USBAUDIO: invalid context payload!");
        }
};

usbaudioApp.prototype._setTopItem = function ()
{
	log.debug('_setTopItem called: curretContextId = ' + this._currentContextId + ", newContextId = " + this._currentContext.params.payload.path);
    var ctxtId = this._currentContext.ctxtId;
    this._currentContextId = this._currentContext.params.payload.path;
    log.debug("md_info Before Change: ", JSON.stringify(this._payloadTable[this._currentContextId].md_info));
    if (this._payloadTable[this._currentContextId].checkValues == true &&
        this._currentContext.params.payload.hasOwnProperty("metadata") && 
        !this._equalValues(this._payloadTable[this._currentContextId].md_info, this._currentContext.params.payload.metadata))
        {
            this._contextTable[ctxtId].controlProperties.List2Ctrl.scrollTo = 0;
            this._payloadTable[this._currentContextId].index = 0;
            this._contextTable[ctxtId].controlProperties.List2Ctrl.focussedItem = 0;
            this._payloadTable[this._currentContextId].focused = 0;
        }
        else
        {
            this._contextTable[ctxtId].controlProperties.List2Ctrl.scrollTo = this._payloadTable[this._currentContextId].index;
            this._contextTable[ctxtId].controlProperties.List2Ctrl.focussedItem = this._payloadTable[this._currentContextId].focused;
        }
    log.debug("md_info After Change: ", JSON.stringify(this._payloadTable[this._currentContextId].md_info));
};

usbaudioApp.prototype._setNumberedList = function ()
{
    if (this._currentContext && this._hasContextPayload())
    {
        this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.numberedList = this._payloadTable[this._currentContext.params.payload.path].hasLineNumbers;
    }
};

usbaudioApp.prototype._setLetterIndexing = function ()
{
    if (this._currentContext && this._hasContextPayload())
    {
        this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.hasLetterIndex = this._payloadTable[this._currentContext.params.payload.path].hasLetterIndexing;
    }
};

usbaudioApp.prototype._setContextLetterIndexing = function (items)
{
    var additionalItems = 0;
    if (this._hasAdditionalItem(this._currentContext.ctxtId))
    {
        additionalItems = 1;
    }

    var letterIndexing = new Array();
    for (var i = 0; i < items.length; i++)
    {
        var index;

        if (parseInt(items[i].index) != -1)
        {
            index = parseInt(items[i].index) + additionalItems;
        }
        else
        {
            index = parseInt(items[i].index);
        }
        log.debug("usbaudio: adding alphabet and indexes", items[i].letter, index);
        letterIndexing[i] = {
            label : items[i].letter.toString(),
            itemIndex : index
        };
    }

    this._currentContextTemplate.list2Ctrl.setLetterIndexData(letterIndexing);
};

usbaudioApp.prototype._populateList = function (tmplt, data, context, dataList, offset, viewType, folderId, folderName)
{
    if (data == null || data == undefined)
    {
        return;
    }

    if (!data.params.browseContextReply)
    {
        log.warn("browseContextReply is null");
        return;
    }

	log.debug("params = " + JSON.stringify(data) + ", viewType = " + viewType);
    
    // set new data list config if needed
    var listConfig = this._initDataList(dataList, context, tmplt, data, viewType);

    var items = data.params.browseContextReply.itemList;

    this._currentTotalCount = data.params.browseContextReply.totalCount;

    var incrementValue;
    if (this._hasAdditionalItem(context, viewType))
    {
        incrementValue = 1;
    }
    else
    {
        incrementValue = 0;
    }

    // Fill with empty items above the offset. Better use other function for doing this
    if (listConfig.setAgain)
    {
        listConfig.dataList = this._setEmptyItems(listConfig.dataList, incrementValue, offset);
        listConfig.dataList.vuiSupport = true;
    }

    log.debug("offset = " + offset + " reply itemListSize = " + items.length);
    var j = 0;
    if (this._currentContext && this._currentContext.ctxtId == "Playlists")
    {
        for (var i = offset + incrementValue; i < items.length + offset + incrementValue; i++)
        {
            var localizedName;
            if (items[j].itemName.toLowerCase() == "more like this")
            {
                localizedName = framework.localize.getLocStr('usbaudio', 'common.Tooltip_IcnUmpMore');
            }
            else if (!this._isAppleDevice(this._connectedDevs.selectedDevType))
            {
                localizedName = this._removeExtention(items[j].itemName);
            }
            else
            {
                localizedName = items[j].itemName;
            }

            listConfig.dataList.items[i] = {
                appData : {
                    name: items[j].itemName,
                    id: items[j].itemId,
                    type: items[j].itemType
                },
                text1 : localizedName,
                itemStyle : 'style01',
                hasCaret: false,
            };
            j++;
        }
    }
    else if (this._currentContext && this._currentContext.ctxtId == "Folders")
    {
        for (var i = offset + incrementValue; i < items.length + offset + incrementValue; i++)
        {
            var tmpName = items[j].itemName;
            if (this._itemType.USBMS_ItemType_Browsable == items[j].itemType)
            {
                tmpName = items[j].itemName + "/";
            }
            else if (this._itemType.USBMS_ItemType_PlayableFile == items[j].itemType)
            {
                tmpName = this._removeExtention(items[j].itemName);
            }
            listConfig.dataList.items[i] = {
                appData : {
                    name: items[j].itemName,
                    id: items[j].itemId,
                    type: items[j].itemType,
                },
                text1: tmpName,
                // image1: this._payloadTable["FolderSongs"].images[items[j].type],
                itemStyle: 'style01',
                disabled: this._payloadTable["FolderSongs"].disabled[items[j].itemType],
                hasCaret: false,
            };
            j++;
        }
        // set FolderName
        if (viewType == 1)
        {
            var dispfolderName = "/";
            if (folderId != 1)
            {
                if (/\/$/.test(folderName))
                {
                    dispfolderName = folderName;
                }
                else
                {
                    dispfolderName = folderName + "/";
                }
            }
            tmplt.list2Ctrl.setTitle({titleStyle : 'style02', text1: dispfolderName});
        }
        else
        {
            tmplt.list2Ctrl.setTitle({titleStyle : 'style02', text1Id: "AllSongs"});
        }
    }
    else
    {
        for (var i = offset + incrementValue; i < items.length + offset + incrementValue; i++)
        {
            // CI-6107 name replace
            var itemName = this._convertEmptyToUnknown(context, items[j].itemName);
            log.debug("items.itemName = " + items[j].itemName + ", itemName = " + itemName + ", contextId = " + context);

            listConfig.dataList.items[i] = {
                appData : {
                    name: items[j].itemName,
                    id: items[j].itemId,
                    type: items[j].itemType
                },
                text1 : itemName,
                itemStyle : 'style01',
                hasCaret: false,
            };
            j++;
        }
    }

    if (this._topItemOptions.setTopItem == true)
    {
        tmplt.list2Ctrl.properties.scrollTo = this._topItemOptions.top;
        tmplt.list2Ctrl.properties.focussedItem = this._topItemOptions.focus;
        this._topItemOptions.setTopItem = false;
        this._topItemOptions.top = null;
        this._topItemOptions.focus = null;
    }

    this._updateItems(tmplt, context, offset, items.length, listConfig, viewType);

};

// update items depending on if there is additional item and where is th list position
usbaudioApp.prototype._updateItems = function (tmplt, context, offset, resultCount, listConfig, viewType)
{
    if (listConfig.setAgain)
    {
        tmplt.list2Ctrl.setDataList(listConfig.dataList);
        tmplt.list2Ctrl.updateItems(0, tmplt.list2Ctrl.dataList.itemCount - 1);
    }
    else if (this._hasAdditionalItem(context, viewType))
    {
        if (offset == 0)
        {
            tmplt.list2Ctrl.updateItems(offset, resultCount);
        }
        else
        {
            tmplt.list2Ctrl.updateItems(offset + 1, resultCount + offset);
        }
    }
    else
    {
        tmplt.list2Ctrl.updateItems(offset, resultCount + offset - 1);
    }

    // Force leaving loading state upon items update.
    if (tmplt.list2Ctrl.setLoading && tmplt.list2Ctrl.inLoading)
    {
        tmplt.list2Ctrl.setLoading(false);
    }
};

usbaudioApp.prototype._hasAdditionalItem = function (context, viewType)
{
    var hasAdditionalItem = false;
    switch (context)
    {
        case "Artists":
        case "Albums":
        case "Genres":
        case "Chapters":
        case "Episodes":
            hasAdditionalItem = true;
            break;
    }

    if (viewType == 1 && context == "Folders")
    {
         hasAdditionalItem = true;
    }
    else if (viewType != 1 && context == "Folders")
    {
        hasAdditionalItem = false;
    }
    return hasAdditionalItem;
};

// Configure dataList. If dataList already configured return the same dataList
usbaudioApp.prototype._initDataList = function (dataList, context, tmplt, data, viewType)
{
    var incrementValue = 0;
    var dataList = dataList;
    var setAgain = false;
    var totalCount = data.params.browseContextReply.totalCount;
    var result = data.params.browseContextReply.result;

    if ((dataList == null || dataList == undefined) && totalCount != 0)
    {
        setAgain = true;
        // Some contexts have additional item which is not received from BLM
        switch (context)
        {
            case "Artists":
                dataList = {
                    itemCountKnown : true,
                    itemCount : totalCount + 1,
                    items: [{
                        appData : {
                            name: "allAlbums"
                        },
                        text1Id : "AllAlbums",
                        itemStyle : 'style01',
                        hasCaret: false,
                    }]
                };
                incrementValue = 1;
                break;
            case "Albums":
                dataList = {
                    itemCountKnown : true,
                    itemCount : totalCount + 1,
                    items: [{
                        appData : {
                            name: "allSongs"
                        },
                        text1Id : "AllSongs",
                        itemStyle : 'style01',
                        hasCaret: false
                    }]
                };
                incrementValue = 1;
                break;
            case "Genres":
                dataList = {
                    itemCountKnown : true,
                    itemCount : totalCount + 1,
                    items: [{
                        appData : {
                            name: "allArtists"
                        },
                        text1Id : "AllArtists",
                        itemStyle : 'style01',
                        hasCaret: false,
                    }]
                };
                incrementValue = 1;
                break;
            case "Episodes":
                dataList = {
                    itemCountKnown : true,
                    itemCount : totalCount + 1,
                    items: [{
                        appData : {
                            name: "allEpisodes"
                        },
                        text1Id : "AllEpisodes",
                        itemStyle : 'style01',
                        hasCaret: false,
                    }]
                };
                incrementValue = 1;
                break;
            case "Chapters":
                dataList = {
                    itemCountKnown : true,
                    itemCount : totalCount + 1,
                    items: [{
                        appData : {
                            name: "allChapters"
                        },
                        text1Id : "AllChapters",
                        itemStyle : 'style01',
                        hasCaret: false
                    }]
                };
                incrementValue = 1;
                break;
            case "Folders":
                if (viewType == 1)
                {
                    dataList = {
                        itemCountKnown : true,
                        itemCount : totalCount + 1,
                        vuiSupport: true,
                        items: [{
                            appData : {
                                name: "allSongs",
                                type: 7,
                            },
                            text1Id : "AllSongs",
                            itemStyle : 'style01',
                            hasCaret: false,
                        }]
                    };
                    incrementValue = 1;
                }
                else
                {
                    dataList = {
                        itemCountKnown : true,
                        itemCount : totalCount,
                        items: new Array()
                    };
                }
                break;
            default:
                // All other contexts do not have additional item
                dataList = {
                    itemCountKnown : true,
                    itemCount : totalCount,
                    items: new Array()
                };
                break;
        }
    }
    else if (totalCount == 0)
    {
        setAgain = true;
        if (result == 0)
        {
            // case: browsing success
            switch (context)
            {
                // if chapter count is 0, CMU display "AllChapters"
                case "Chapters":
                    dataList = {
                        itemCountKnown : true,
                        itemCount : totalCount + 1,
                        items: [{
                            appData : {
                                name: "allChapters"
                            },
                            text1Id : "AllChapters",
                            itemStyle : 'style01',
                            hasCaret: false
                        }]
                    };
                    incrementValue = 1;
                    break;
                default:
                    dataList = {
                        itemCountKnown : true,
                        itemCount : totalCount,
                        items: new Array()
                    };
                    break;
            }
        }
        else
        {
            dataList = {
                itemCountKnown : true,
                itemCount : totalCount,
                items: new Array()
            };
        }
    }

    return {dataList: dataList, setAgain: setAgain};
};

usbaudioApp.prototype._setEmptyItems = function (dataList, start, count)
{
    for (var i = start; i < count + start; i++)
    {
        dataList.items[i] = {
            appData : "",
            text1 : "",
            itemStyle : 'style01',
            hasCaret: false,
        };
    }
    return dataList;
};

// Callculate offset
usbaudioApp.prototype._calculateOffset = function (offset, context)
{
    var newOffset = offset - 10;
    if (this._hasAdditionalItem(context))
    {
        if (newOffset < 2)
        {
            newOffset = 0;
        }
        else
        {
            newOffset = newOffset - 1;
        }
    }
    else
    {
        if (newOffset < 0)
        {
            newOffset = 0;
        }
    }
    return newOffset;
};

usbaudioApp.prototype._equalValues = function (oldValues, newValues)
{
    var equalValues = true;
    if (oldValues.hasOwnProperty("artist"))
    {
        if (oldValues.artist.value != newValues.artistName || oldValues.artist.id != newValues.artistId)
        {
            equalValues = false;
            oldValues.artist.value = newValues.artistName;
            if (newValues.hasOwnProperty("artistId"))
            {
                oldValues.artist.id = newValues.artistId;
            }
            else
            {
                oldValues.artist.id = 0;
            }
        }
    }

    if (oldValues.hasOwnProperty("album"))
    {
        if (oldValues.album.value != newValues.albumName || oldValues.album.id != newValues.albumId)
        {
            equalValues = false;
            oldValues.album.value = newValues.albumName;
            if (newValues.hasOwnProperty("albumId"))
            {
                oldValues.album.id = newValues.albumId;
            }
            else
            {
                oldValues.album.id = 0;
            }
        }
    }

    if (oldValues.hasOwnProperty("genre"))
    {
        if (oldValues.genre.value != newValues.genreName || oldValues.genre.id != newValues.genreId)
        {
            equalValues = false;
            oldValues.genre.value = newValues.genreName;
            if (newValues.hasOwnProperty("genreId"))
            {
                oldValues.genre.id = newValues.genreId;
            }
            else
            {
                oldValues.genre.id = 0;
            }
        }
    }

    if (oldValues.hasOwnProperty("audiobook"))
    {
        if (oldValues.audiobook.value != newValues.audiobookName || oldValues.audiobook.id != newValues.audiobookId)
        {
            equalValues = false;
            oldValues.audiobook.value = newValues.audiobookName;
            if (newValues.hasOwnProperty("audiobookId"))
            {
                oldValues.audiobook.id = newValues.audiobookId;
            }
            else
            {
                oldValues.audiobook.id = 0;
            }
        }
    }

    if (oldValues.hasOwnProperty("podcast"))
    {
        if (oldValues.podcast.value != newValues.podcastName || oldValues.podcast.id != newValues.podcastId)
        {
            equalValues = false;
            oldValues.podcast.value = newValues.podcastName;
            if (newValues.hasOwnProperty("podcastId"))
            {
                oldValues.podcast.id = newValues.podcastId;
            }
            else
            {
                oldValues.podcast.id = 0;
            }
        }
    }

    if (oldValues.hasOwnProperty("playlist"))
    {
        if (oldValues.playlist.value != newValues.playlistName || oldValues.playlist.id != newValues.playlistId)
        {
            equalValues = false;
            oldValues.playlist.value = newValues.playlistName;
            if (newValues.hasOwnProperty("playlistId"))
            {
                oldValues.playlist.id = newValues.playlistId;
            }
            else
            {
                oldValues.playlist.id = 0;
            }
        }
    }

    return equalValues;
};

usbaudioApp.prototype._createMdInfo = function (mdInfo)
{
    var mdInfoList = new Array();
    if (mdInfo.hasOwnProperty("genre"))
    {
        mdInfoList.push({value: mdInfo.genre.value, type: mdInfo.genre.type, item_id: mdInfo.genre.id});
    }

    if (mdInfo.hasOwnProperty("artist"))
    {
        mdInfoList.push({value: mdInfo.artist.value, type: mdInfo.artist.type, item_id: mdInfo.artist.id});
    }

    if (mdInfo.hasOwnProperty("album"))
    {
        mdInfoList.push({value: mdInfo.album.value, type: mdInfo.album.type, item_id: mdInfo.album.id});
    }

    if (mdInfo.hasOwnProperty("playlist"))
    {
        mdInfoList.push({value: mdInfo.playlist.value, type: mdInfo.playlist.type, item_id: mdInfo.playlist.id});
    }

    if (mdInfo.hasOwnProperty("audiobook"))
    {
        mdInfoList.push({value: mdInfo.audiobook.value, type: mdInfo.audiobook.type, item_id: mdInfo.audiobook.id});
    }

    if (mdInfo.hasOwnProperty("podcast"))
    {
        mdInfoList.push({value: mdInfo.podcast.value, type: mdInfo.podcast.type, item_id: mdInfo.podcast.id});
    }

    if (mdInfo.hasOwnProperty("song"))
    {
        mdInfoList.push({value: mdInfo.song.value, type: mdInfo.song.type, item_id: mdInfo.song.id});
    }

    return mdInfoList;
};

usbaudioApp.prototype._createMdInfoFromMsg = function (msg)
{
    var mdInfoList = new Array();
    var mdInfo = this._payloadTable[msg.params.payload.path].md_info;
    if (mdInfo.hasOwnProperty("genre") && msg.params.payload.metadata.hasOwnProperty("genreName"))
    {
        mdInfoList.push({value: msg.params.payload.metadata.genreName, type: mdInfo.genre.type, item_id: msg.params.payload.metadata.genreId});
    }

    if (mdInfo.hasOwnProperty("artist") && msg.params.payload.metadata.hasOwnProperty("artistName"))
    {
        mdInfoList.push({value: msg.params.payload.metadata.artistName, type: mdInfo.artist.type, item_id: msg.params.payload.metadata.artistId});
    }

    if (mdInfo.hasOwnProperty("album") && msg.params.payload.metadata.hasOwnProperty("albumName"))
    {
        mdInfoList.push({value: msg.params.payload.metadata.albumName, type: mdInfo.album.type, item_id: msg.params.payload.metadata.albumId});
    }

    if (mdInfo.hasOwnProperty("audiobook") && msg.params.payload.metadata.hasOwnProperty("audiobookName"))
    {
        mdInfoList.push({value: msg.params.payload.metadata.audiobookName, type: mdInfo.audiobook.type, item_id: msg.params.payload.metadata.audiobookId});
    }

    if (mdInfo.hasOwnProperty("podcast") && msg.params.payload.metadata.hasOwnProperty("podcastName"))
    {
		mdInfoList.push({value: msg.params.payload.metadata.podcastName, type: this._mdFilter.USBM_MetadataType_Podcast, item_id: msg.params.payload.metadata.podcastId});
    }

    if (msg.params.payload.metadata.hasOwnProperty("episodeName") && this._currentContext && this._currentContext.ctxtId == "Episodes")
    {
        mdInfoList.push({value: msg.params.payload.metadata.episodeName, type: this._mdFilter.USBM_MetadataType_ObjectName, item_id: msg.params.payload.metadata.episodeId});
    }

    if (mdInfo.hasOwnProperty("playlist") && msg.params.payload.metadata.hasOwnProperty("playlistName"))
    {
        mdInfoList.push({value: msg.params.payload.metadata.playlistName, type: mdInfo.playlist.type, item_id: msg.params.payload.metadata.playlistId});
    }

    if (mdInfo.hasOwnProperty("song"))
    {
        mdInfoList.push({value: mdInfo.song.value, type: mdInfo.song.type, item_id: mdInfo.song.item_id});
    }

    return mdInfoList;
};

usbaudioApp.prototype._createFilter = function(path, folderId)
{
    var filterList = new Array();
    var browseCategory = this._browsingTable[path].browseCategory;
    var sortOrder = this._browsingTable[path].sortOrder;

    var id1 = this._objectId.USBMS_ObjectID_Invalid;
    if (browseCategory == this._browseCategory.USBMS_BROWSE_ALL_CONTENTS_IN_FOLDER ||
        browseCategory == this._browseCategory.USBMS_BROWSE_ALL_SUBFOLDER_ENTRIES_IN_FOLDER)
    {
        if (folderId)
        {
            this._browsingTable[path].idLevel1.id = folderId;
            id1 = folderId;
        }
        else
        {
            this._browsingTable[path].idLevel1.id = 1;
            id1 = 1;
        }
    }
    else
    {
        id1 = this._browsingTable[path].idLevel1.id;
    }
    var id2 = this._browsingTable[path].idLevel2.id;
    var id3 = this._browsingTable[path].idLevel3.id;
    
    filterList.push({
                  filterEnum: browseCategory, 
                  idLevel1: id1, 
                  idLevel2: id2, 
                  idLevel3: id3, 
                  sortOrder: sortOrder
    });
    log.debug("filterList = " + JSON.stringify(filterList));

    return filterList[0];
};

usbaudioApp.prototype._createRequest = function ()
{
    log.debug("_createRequest called");
    if (this._hasContextPayload())
    {
        var filter = this._createFilter(this._currentContextId);
        this._requestList(
            [filter],
            this._calculateOffset(this._payloadTable[this._currentContextId].index, this._currentContext.ctxtId),    // offset index
            null,                                                                                                    // context data list NOTE: empty every time we enter context
            this._currentContext.params.payload.path);                                                               // name of the context
    }
    else
    {
        log.warn("usbaudio: Context with empty payload!");
    }
};

/**set the title of the screen*/
usbaudioApp.prototype._setTitle = function ()
{
    if (this._currentContext &&
        this._currentContext.params.hasOwnProperty("payload") &&
        this._currentContext.params.payload.hasOwnProperty("path"))
        {
            this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1Id = "";
            this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1SubMap = "";
            this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1 = "";

            var path = this._currentContext.params.payload.path;
            var title = this._payloadTable[this._currentContext.params.payload.path].titleConfig;
            switch (title)
            {
                case "Playlists":
                    this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1Id = "Playlists";
                    break;
                case "playlistName":
                     if (this._payloadTable[path].md_info.playlist.value == "More Like This")
                    {
                        this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1 = framework.localize.getLocStr('usbaudio', 'common.Tooltip_IcnUmpMore');
                    }
                    else if (!this._isAppleDevice(this._connectedDevs.selectedDevType))
                    {
                        this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1 = this._removeExtention(this._payloadTable[path].md_info.playlist.value); 
                    }
                    else
                    {
                        this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1 = this._payloadTable[path].md_info.playlist.value; 
                    }
                    break;
                case "Artists":
                    this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1Id = "Artists";
                    break;
                case "allArtists":
                    this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1Id = "AllArtists";
                    break;
                case "artistName":
                    this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1 = this._convertEmptyToUnknown("Artists", this._payloadTable[path].md_info.artist.value);
                    break;
                case "Albums":
                    this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1Id = "Albums";
                    break;
                case "allAlbums":
                    this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1Id = "AllAlbums";
                    break;
                case "albumName":
                    this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1 = this._convertEmptyToUnknown("Albums", this._payloadTable[path].md_info.album.value);
                    break;
                case "Songs":
                    this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1Id = "Songs";
                    break;
                case "allSongs":
                    this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1Id = "AllSongs";
                    break;
                case "Genres":
                    this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1Id = "Genres";
                    break;
                case "genreName":
                    this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1 = this._convertEmptyToUnknown("Genres", this._payloadTable[path].md_info.genre.value);
                    break;
                case "Audiobooks":
                    this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1Id = "Audiobooks";
                    break;
                case "audiobookName":
                    this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1 = this._payloadTable[path].md_info.audiobook.value;
                    break;
                case "Podcasts":
                    this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1Id = "Podcasts";
                    break;
                case "podcastName":
                    this._contextTable[this._currentContext.ctxtId].controlProperties.List2Ctrl.title.text1 = this._payloadTable[path].md_info.podcast.value;
                    break;
                default:
                    log.debug("Unknown title config:", title);
            }
        }
        else
        {
            log.debug("No context payload or path");
        }
};

usbaudioApp.prototype._playLineNumber = function (itemName, itemType, itemId, fromVui)
{
	log.debug("_playLineNumber");
    this._clearMetadata();
    this._clearTotalElapsedTime();
    var mdTypeList = [this._mdFilter.USBM_MetadataType_ObjectName];
    var mdInfoList = this._createMdInfo(this._payloadTable[this._currentContextId].md_info);
    var sortSettings;
    if (itemType != this._payloadTable["Podcasts"].md_info[0])
    {
        sortSettings = this._payloadTable[this._currentContextId].sort_settings;
    }
    else
    {
        sortSettings = this._payloadTable["PodcastEpisodes"].sort_settings;
    }

    if (itemName != undefined && itemType != undefined && itemId != undefined &&
        itemName != null && itemType != null && itemId != null)
    {
        mdInfoList.push({value: itemName, type: itemType, item_id: itemId});
    }
    if (mdInfoList.length > 1)
    {
        for (var i=0; i < mdInfoList.length; i++)
        {
            if (mdInfoList[i].type == 0)
            {
                mdInfoList.splice(i, 1);
                i--;
            }
        }
    }

    this._SelectSongsAndPlay(mdTypeList, mdInfoList, sortSettings, fromVui, this._currentContextId);
};

// Fill NowPlaying with data
usbaudioApp.prototype._populateNowPlayingCtrl = function (tmplt, songDetails)
{
	log.info('_populateNowPlayingCtrl called... songDetails.screenTitle: ', songDetails.screenTitle);
    if (this._connectedDevs.playbackReady)
    {
        log.debug("_populateNowPlayingCtrl called...");
        tmplt.nowPlaying4Ctrl.setAudioTitle({audioTitleText: songDetails.title, audioTitleIcon: "common/images/icons/IcnListSong.png"});
        tmplt.nowPlaying4Ctrl.setDetailLine1({detailText: songDetails.artist, detailIcon: "common/images/icons/IcnListContact_Placeholder.png"});
        tmplt.nowPlaying4Ctrl.setDetailLine2({detailText: songDetails.album, detailIcon: "common/images/icons/IcnListCdPlayer_En.png"});

        if (songDetails.screenTitle)
        {
            tmplt.nowPlaying4Ctrl.setCtrlTitle({ctrlTitleText: songDetails.screenTitle});
        }
        else
        {
			log.info('Playlist appears to be null, so assuming EMPTY!!!');
            tmplt.nowPlaying4Ctrl.setCtrlTitle({ctrlTitleText: ""});
        }
        if (this._connectedDevs.showGracenote == true && songDetails.title && songDetails.artist && songDetails.album && this._connectedDevs.mltPossible)
        {
            tmplt.nowPlaying4Ctrl.setDetailLine3({detailText: "Powered By Gracenote®"});
            this._gracenoteTimeout = setTimeout(this._removeGracenote.bind(this), this._gracenoteTimeoutTime);
        }
    }
    tmplt.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("GenerateMoreLikeThis", !(this._connectedDevs.mltPossible && this._connectedDevs.playbackReady && !this._connectedDevs.endOfListState));
};

usbaudioApp.prototype._setTotalElapsedTime = function ()
{
    this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setElapsedTime(this._secondsToHHMMSS(this._umpElapseTime));
    this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setTotalTime(this._secondsToHHMMSS(this._umpTotalTime));

    var progress = this._umpElapseTime / this._umpTotalTime;
    if (this._umpElapseTime != 0 && this._umpTotalTime != 0)
    {
        this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.updateScrubber(progress);
    }
};

usbaudioApp.prototype._removeGracenote = function ()
{
    clearTimeout(this._gracenoteTimeout);
    this._gracenoteTimeout = null;
    this._connectedDevs.showGracenote = false;

    if (this._connectedDevs.deviceSelected == this._connectedDevs.A.deviceId)
    {
        this._connectedDevs.A.showGracenote = false;
    }
    else
    {
        this._connectedDevs.B.showGracenote = false;
    }

    if (this._currentContext.ctxtId == "NowPlaying" && this._currentContextTemplate)
    {
        this._currentContextTemplate.nowPlaying4Ctrl.setDetailLine3({detailText: ""});
    }
};

usbaudioApp.prototype._updateUmpButtons = function (tmplt, buttons)
{
    if (buttons.repeat == "USBM_REPEAT_MODE_ALL" && this._umpButtonConfig["repeat"].currentState !== "List")
    {
        tmplt.nowPlaying4Ctrl.umpCtrl.setButtonState("repeat", "List");
    }
    else if (buttons.repeat == "USBM_REPEAT_MODE_ONE" && this._umpButtonConfig["repeat"].currentState !== "Song")
    {
        tmplt.nowPlaying4Ctrl.umpCtrl.setButtonState("repeat", "Song");
    }
    else if (buttons.repeat == "USBM_REPEAT_MODE_NONE" && this._umpButtonConfig["repeat"].currentState !== "None")
    {
        tmplt.nowPlaying4Ctrl.umpCtrl.setButtonState("repeat", "None");
    }

    if (buttons.shuffle == "USBM_SHUFFLE_MODE_NONE" && this._umpButtonConfig["shuffle"].currentState != "Off")
    {
        tmplt.nowPlaying4Ctrl.umpCtrl.setButtonState("shuffle", "Off");
    }
    else if (buttons.shuffle == "USBM_SHUFFLE_MODE_TRACKS" && this._umpButtonConfig["shuffle"].currentState != "On")
    {
        tmplt.nowPlaying4Ctrl.umpCtrl.setButtonState("shuffle", "On");
    }
};

usbaudioApp.prototype._populateCoverArt = function (tmplt, songDetails)
{
    if (this._connectedDevs.playbackReady)
    {
        log.debug("usbaudioApp _populateCoverArt called...", songDetails);

         var ctrlData = {
             imagePath: null
         };

        if (songDetails.coverArt != "None")
        {
            ctrlData = {ctrlTitle:songDetails.genre, audioTitle:songDetails.title, detailLine1:songDetails.artist, detailLine2:songDetails.album, imagePath: songDetails.coverArt};
            tmplt.nowPlaying4Ctrl.setArtworkImagePath(songDetails.coverArt+"?" + new Date().getTime());
        }
        else
        {
            ctrlData = {"ctrlTitle":songDetails.genre, "audioTitle":songDetails.title, "detailLine1":songDetails.artist, "detailLine2":songDetails.album, imagePath:"./common/images/no_artwork_icon.png"};
            songDetails.coverArt = "./common/images/no_artwork_icon.png";
            tmplt.nowPlaying4Ctrl.setArtworkImagePath();
        }
    }
};

usbaudioApp.prototype._requestMore = function (index)
{
    // if the list has additional item set by the application decrease the offset with one
    if (this._hasAdditionalItem(this._currentContext.ctxtId) && index > 0)
    {
        index = index - 1;
    }

    var filter = this._createFilter(this._currentContextId);
    this._requestList(
        [filter],
        index,                                              // offset index
        this._currentContextTemplate.list2Ctrl.dataList,    // context data list NOTE: empty every time we enter context
        this._currentContext.params.payload.path);          // name of the context
};

usbaudioApp.prototype._saveIndex = function ()
{
    if (this._outgoingContext &&
        this._outgoingContext.hasOwnProperty("params") &&
        this._outgoingContext.params.hasOwnProperty("payload") &&
        this._outgoingContext.params.payload.hasOwnProperty("path") &&
        this._outgoingContext.params.payload.path != "Invalid" ) 
    {
        if(this._outgoingContextTemplate) // check added for SCR SW00157864
        { 
            this._payloadTable[this._outgoingContext.params.payload.path].index = this._outgoingContextTemplate.list2Ctrl.topItem;
            this._payloadTable[this._outgoingContext.params.payload.path].focused = this._outgoingContextTemplate.list2Ctrl.focussedItem;
        }
        else
        {
            log.warn("USBAUDIO: outgoing context template is null!");
        }
    }
    else if (this._outgoingContext &&
        this._outgoingContext.hasOwnProperty("params") &&
        this._outgoingContext.params.hasOwnProperty("payload") &&
        this._outgoingContext.params.payload.hasOwnProperty("path") &&
        this._outgoingContext.params.payload.path == "Invalid")
    {
        log.warn("USBAUDIO: outgoing context with invalid path!");
    }
    else
    {
        log.warn("USBAUDIO: outgoing context with invalid payload");
    }
};

usbaudioApp.prototype._hasContextPayload = function ()
{
    var returnValue = false;
    if (this._currentContext &&
        this._currentContext.hasOwnProperty("params") &&
        this._currentContext.params.hasOwnProperty("payload"))
        {
            returnValue = true;
        }
    return returnValue;
};

/**clear cachedSongDetails data*/
usbaudioApp.prototype._clearMetadata = function ()
{
    this._cachedSongDetails = {
        screenTitle: null,
        genre: null,
        artist: null,
        title: null,
        album: null,
        coverArt: "None"
    };
};

usbaudioApp.prototype._clearTotalElapsedTime = function ()
{
    this._umpElapseTime = 0;
    this._umpTotalTime = 0;
    this._stopElapsedUpdate = false;
};

usbaudioApp.prototype._clearUSBData = function ()
{
    var epmtyMD = {
        artistName: "",
        albumName: "",
        genreName: "",
        audiobookName: "",
        podcastName: "",
        playlistName: "",
        artistId: "",
        albumId: "",
        genreId: "",
        audiobookId: "",
        podcastId: "",
        playlistId: "",
    };

    for (var i in this._payloadTable)
    {
        this._payloadTable[i].index = 0;
        this._payloadTable[i].focused = 0;

        if (this._payloadTable[i].hasOwnProperty("md_info") && this._payloadTable[i].checkValues)
        {
            this._equalValues(this._payloadTable[i].md_info, epmtyMD);
        }
    }
};

usbaudioApp.prototype._clearTrackInfo = function ()
{
    this._trackInfo.trackId = this._objectId.USBMS_ObjectID_Invalid;
    this._trackInfo.trackIdOffSetInList = this._objectId.USBMS_ObjectID_Invalid;
};

usbaudioApp.prototype._setFilter = function (filterEnum, id1, id2, id3)
{
    log.debug("_setFilter called this._currentContextId = " + this._currentContextId);

    var path = this._getContextId(filterEnum);

    // set new value
    this._browsingTable[path].idLevel1.id = id1;
    this._browsingTable[path].idLevel2.id = id2;
    this._browsingTable[path].idLevel3.id = id3;

    log.debug("SongPath = " + path +
              ", browseCategory = " + this._browsingTable[path].browseCategory + 
              ", idLevel1 = " + this._browsingTable[path].idLevel1.id +
              ", idLevel2 = " + this._browsingTable[path].idLevel2.id +
              ", idLevel3 = " + this._browsingTable[path].idLevel3.id +
              ", sortOrder = " + this._browsingTable[path].sortOrder);
};

usbaudioApp.prototype._disableUSBAudioMenus = function ()
{
    log.debug("_disableUSBAudioMenus called");
    for (var i = 0; i < this._usbaudioCtxtDataList.itemCount; i++)
    {
        this._usbaudioCtxtDataList.items[i].disabled = true;
        log.debug("disabled item number = ", i);
    }
};

usbaudioApp.prototype._enableUSBAudioMenus = function ()
{
    log.debug("_enableUSBAudioMenus called");
    // check which device is selected and its type
    if ((this._connectedDevs.deviceSelected == this._connectedDevs.A.deviceId && this._isAppleDevice(this._connectedDevs.A.type)) || 
        (this._connectedDevs.deviceSelected == this._connectedDevs.B.deviceId && this._isAppleDevice(this._connectedDevs.B.type))) 
    {
        this._enableiPodMenu();
    }
    else
    {
        this._enableUMASSMenu();
    }

    if (this._currentContext && this._currentContext.ctxtId == "USBAudio" && this._currentContextTemplate)
    {
        log.debug("update items");
        this._currentContextTemplate.list2Ctrl.updateItems(0, this._usbaudioCtxtDataList.itemCount);
    }
};

usbaudioApp.prototype._enableUMASSMenu = function ()
{
    log.debug("_enableUMASSMenu called");

    this._disableUSBAudioMenus();

    var doNotEnable = this._usbaudioCtxtDataList.itemCount;
    if (this._connectedDevs.folderBrowsingPossible)
    {
        this._usbaudioCtxtDataList.items[this._usbaudioCtxtDataList.itemCount - 1].disabled = false;
        log.debug("folder is enable");
    }
    if (this._connectedDevs.mdBrowsingPossible)
    {
        // if the selected device type is UMASS "Podcasts" and "Audiobooks" should remain disabled
        doNotEnable = 3;
        this._usbaudioCtxtDataList.items[this._usbaudioCtxtDataList.itemCount - 2].disabled = true;
        this._usbaudioCtxtDataList.items[this._usbaudioCtxtDataList.itemCount - 3].disabled = true;
        log.debug("Podcasts and Audiobooks is disable");
    }

    for (var i = 0; i < this._usbaudioCtxtDataList.itemCount - doNotEnable; i++)
    {
        this._usbaudioCtxtDataList.items[i].disabled = false;
    }
};

usbaudioApp.prototype._enableiPodMenu = function ()
{
    log.debug("_enableiPodMenu called");

    this._disableUSBAudioMenus();

    // always folder is disabled
    if (this._connectedDevs.mdBrowsingPossible)
    {
        for (var i = 0; i < this._usbaudioCtxtDataList.itemCount - 1; i++)
        {
            this._usbaudioCtxtDataList.items[i].disabled = false;
            log.debug("eabled item number = ", i);
        }
        this._usbaudioCtxtDataList.items[this._usbaudioCtxtDataList.itemCount - 1].disabled = true;
    }
};

usbaudioApp.prototype._enableMLT = function (isReady)
{
    log.debug("enableMLT called");
    if (this._currentContext && this._currentContext.ctxtId && this._currentContextTemplate && this._currentContext.ctxtId == "NowPlaying")
    {
        log.info("MLT button set ", !isReady);
        this._currentContextTemplate.nowPlaying4Ctrl.umpCtrl.setButtonDisabled("GenerateMoreLikeThis", !isReady);
        if (this._connectedDevs.showGracenote == true && isReady == true)
        {
            this._currentContextTemplate.nowPlaying4Ctrl.setDetailLine3({detailText: "Powered By Gracenote®"});
            this._gracenoteTimeout = setTimeout(this._removeGracenote.bind(this), this._gracenoteTimeoutTime);
        }
    }
};

usbaudioApp.prototype._getErrorId = function (error)
{
    var text1Id = null;
    switch (error)
    {
        case "USBM_DEVICE_ERR_UNKNOWN_DEV":
            text1Id = "UnknownType";
            break;
        case "USBM_DEVICE_ERR_NOTSUP_DEV":
            text1Id = "NotSupported";
            break;
        case "USBM_DEVICE_ERR_BAD_FIRMWARE":
            text1Id = "IncompatibleFirmware";
            break;
        case "USBM_DEVICE_ERR_AUTH_FAILED":
            text1Id = "AuthenticationFailure";
            break;
        case "USBM_DEVICE_ERR_NO_FILES":
            text1Id = "NoPlayableFiles";
            break;
    }
    return text1Id;
};

usbaudioApp.prototype._secondsToHHMMSS = function (seconds)
{
        var min = Math.floor(seconds /60);
        var sec = seconds - (min * 60);

        if (min < 10) {min = "0" + min;}
        if (sec < 10) {sec = "0" + sec;}
        return min + ':' + sec;
};

usbaudioApp.prototype._addAlbumsAdditionalFilters = function (mdInfo)
{
    if (this._currentContext &&
        this._currentContext.params.hasOwnProperty("payload") &&
        this._currentContext.params.payload.hasOwnProperty("path") &&
        this._payloadTable[this._currentContext.params.payload.path].md_info.hasOwnProperty("genre"))
        {
            mdInfo.unshift({
                value: this._payloadTable[this._currentContext.params.payload.path].md_info.genre.value,
                type: this._payloadTable[this._currentContext.params.payload.path].md_info.genre.type,
                item_id: this._payloadTable[this._currentContext.params.payload.path].md_info.genre.id});
        }

    return mdInfo;
};

usbaudioApp.prototype._createAlbumFilter = function (offset, artistId, contextPath)
{
    var filterList = new Array();
    if (contextPath == "GenresAllArtists" || contextPath == "GenresAllArtists_ArtistAlbums")
    {
        var path = "GenresAllArtists_ArtistAlbums";
        filterList.push({
                  filterEnum: this._browsingTable[path].browseCategory, 
                  idLevel1: artistId, 
                  idLevel2: this._objectId.USBMS_ObjectID_Invalid,
                  idLevel3: this._objectId.USBMS_ObjectID_Invalid, 
                  sortOrder: this._browsingTable[path].sortOrder
        });
    }
    else if (contextPath == "GenreArtists" || contextPath == "Genre_ArtistAlbums")
    {
        var path = "Genre_ArtistAlbums";
        filterList.push({
                  filterEnum: this._browsingTable[path].browseCategory, 
                  idLevel1: this._payloadTable[contextPath].md_info.genre.id, 
                  idLevel2: artistId,
                  idLevel3: this._objectId.USBMS_ObjectID_Invalid, 
                  sortOrder: this._browsingTable[path].sortOrder
        });
    }
    else
    {
        // contextPath == "AllArtists" and other
        var path = "ArtistAlbums";
        filterList.push({
                  filterEnum: this._browsingTable[path].browseCategory, 
                  idLevel1: artistId, 
                  idLevel2: this._objectId.USBMS_ObjectID_Invalid,
                  idLevel3: this._objectId.USBMS_ObjectID_Invalid, 
                  sortOrder: this._browsingTable[path].sortOrder
        });
    }

    var params = {
        "browseContext":{
            "deviceId": this._connectedDevs.deviceSelected,
            "filterList": {
                "filter": filterList
            },
            "playListName": "",
            "offset": offset,
            "count": 5
        }, 
        "browseContext_sz": {
            "filterList_sz": {
                "filter_sz": filterList.length
            } 
        }
    };

    return params;
}

// Check how many albums an artist have
usbaudioApp.prototype._countAlbums = function (artistName, action, artistId, fromVui, contextPath)
{
    log.debug("_countAlbums called artistName = " + artistName + ", action = " + action + ", artistId = " + artistId + ", conxtextPath = " + contextPath + ", this._currentContextId = " + this._currentContextId);

    var params = this._createAlbumFilter(0, artistId, contextPath);

    log.debug("params = " + JSON.stringify(params));
    framework.sendRequestToAppsdk(this.uiaId, this._countAlbumsCallback.bind(this, artistName, artistId, action, fromVui, contextPath), "usbms", "BrowseContext", params);
};

// check how many artists have albums with that name
usbaudioApp.prototype._countArtists = function (albumName, albumId, action, fromVui, contextPath)
{
    log.debug("_countArtists called albumName = " + albumName + ", albumId = " + albumId + ", action = " + action + ",contextPath = " + contextPath + ", currentContextId = " + this._currentContextId);

    var path = "AlbumsDisambiguate";
    var filterList = new Array();        
    filterList.push({
                  filterEnum: this._browsingTable[path].browseCategory, 
                  idLevel1: albumId, 
                  idLevel2: this._objectId.USBMS_ObjectID_Invalid,
                  idLevel3: this._objectId.USBMS_ObjectID_Invalid, 
                  sortOrder: this._browsingTable[path].sortOrder
    });
	var params = {
		"browseContext":{
		    "deviceId": this._connectedDevs.deviceSelected,
		    "filterList": {
                "filter": filterList
            },
            "playListName": "",
		    "offset": 0,
            "count": 5
        }, 
		"browseContext_sz": {
            "filterList_sz": {
                "filter_sz": filterList.length
            } 
        }
	};

    log.debug("params = " + JSON.stringify(params));
    framework.sendRequestToAppsdk(this.uiaId, this._countArtistsCallback.bind(this, albumName, albumId, action, fromVui, contextPath), "usbms", "BrowseContext", params);
};

usbaudioApp.prototype._thereIsMoreThanOneArtist = function(albumName, albumId, action, fromVui, contextPath, params)
{
    log.debug("_thereIsMoreThanOneArtist");
    if(!params.browseContextReply.hasOwnProperty("itemList") || params.browseContextReply.itemList.length == 0 
       || params.browseContextReply.totalCount == 0)
    {
        log.info("Empty list!!!");
        return;
    }

    var lastItem = params.browseContextReply.totalCount - 1;
    if ((!this._isAppleDevice(this._connectedDevs.selectedDevType)) ||
        (params.browseContextReply.itemList[lastItem].itemType == this._itemType.USBMS_ItemType_Browsable))
    {
        // send event to go to all albums
        if (action == "browse")
        {
            framework.sendEventToMmui(this.uiaId, "BrowseAlbumDisambiguate", {payload:{albumName: albumName, albumId: albumId}}, fromVui);
        }
        else
        {
            framework.sendEventToMmui(this.uiaId, "PlayAlbumDisambiguate", {payload:{albumName: albumName, albumId: albumId}}, fromVui);
        }
    }
    else
    {
        if (action == "browse")
        {
            framework.sendEventToMmui(this.uiaId, "BrowseAlbumArtist", {payload:{albumName: albumName, albumId: albumId}}, fromVui);
        }
        else
        {
            var path = "AlbumSongs";
            var filter = {
                  filterEnum: this._browsingTable[path].browseCategory, 
                  idLevel1: albumId, 
                  idLevel2: this._objectId.USBMS_ObjectID_Invalid,
                  idLevel3: this._objectId.USBMS_ObjectID_Invalid,
                 sortOrder: this._browsingTable[path].sortOrder
            };
            this._setSongListCategory(filter.filterEnum, null);
            framework.sendEventToMmui(this.uiaId, "PlaySongIndex", {payload:{filter: filter, objectId: 0}}, fromVui);
        }
    }
};

usbaudioApp.prototype._thereIsOnlyOneArtist = function(albumName, albumId, action, fromVui, contextPath, params)
{
    log.debug("_thereIsOnlyOneArtist");
    if(!params.browseContextReply.hasOwnProperty("itemList") || params.browseContextReply.itemList.length == 0 
       || params.browseContextReply.totalCount == 0)
    {
        log.info("Empty list!!!");
    }
    else
    {
        var artistName = params.browseContextReply.itemList[0].itemName;
        var artistId = params.browseContextReply.itemList[0].itemId;
        var lastItem = params.browseContextReply.totalCount - 1;
	    if ((!this._isAppleDevice(this._connectedDevs.selectedDevType)) ||
            (params.browseContextReply.itemList[lastItem].itemType == this._itemType.USBMS_ItemType_Browsable))
	    {
	        if (action == "browse")
	        {
	            // send event to go songs of the current albums
	            framework.sendEventToMmui(this.uiaId, "BrowseAlbumArtist", {payload:{albumName: albumName, albumId: albumId}}, fromVui);
	        }
	        else
	        {
	            // select songs of this artist with this album
	            var mdType = [this._mdFilter.USBM_MetadataType_ObjectName];
	            var mdInfo = [{value: albumName, type: this._mdFilter.USBM_MetadataType_AlbumName, item_id: albumId}, {value: artistName, type: this._mdFilter.USBM_MetadataType_ArtistName, item_id: artistId}];
	            var sortSettings = [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}];
	            if (this._currentContextId == "AllAlbums")
	            {
	                this._SelectSongsAndPlay(mdType, mdInfo, sortSettings, fromVui, "AlbumsDisambiguateSongs");
	            }
	            else
	            {
                    var path = contextPath;
                    if (fromVui)
                    {
                        if (this._currentContextId == "Genre_AllAlbums")
                        {
                            path = "Genre_AllAlbums_AlbumSongs";
                        }
                        else if (this._currentContextId == "GenresAllArtists_AllAlbums")
                        {
                            path = "GenresAllArtists_AllAlbums_AlbumSongs";
                        }
                        else if (this._currentContextId == "AllArtistsAllAlbums")
                        {
                            path = "ArtistsAllAlbums_AlbumSongs";
                        }
                        else
                        {
                            path = "AlbumsDisambiguateSongs";
                        }
                    }
                    this._SelectSongsAndPlay(mdType, mdInfo, sortSettings, fromVui, path);
	            }
	        }
	    }
	    else
	    {
	        if (action == "browse")
	        {
	            // send event to go songs of the current albums
	            framework.sendEventToMmui(this.uiaId, "BrowseAlbumArtist", {payload:{albumName: albumName, albumId: albumId}}, fromVui);
	        }
	        else
	        {
                this._clearMetadata();
                this._clearTotalElapsedTime();
	            // select songs of this artist with this album
                var path = "AlbumsDisambiguateSongs";
                var filter = {
                      filterEnum: this._browsingTable[path].browseCategory, 
                      idLevel1: albumId, 
                      idLevel2: artistId, 
                      idLevel3: this._objectId.USBMS_ObjectID_Invalid, 
                     sortOrder: this._browsingTable[path].sortOrder
                };
                this._setSongListCategory(filter.filterEnum, null);
                framework.sendEventToMmui(this.uiaId, "PlaySongIndex", {payload:{filter: filter, objectId: 0}}, fromVui);
	        }
	    }
    }        
};

usbaudioApp.prototype._countArtistsCallback = function (albumName, albumId, action, fromVui, contextPath, params)
{
    log.debug("countArtistsCallback called params = " + JSON.stringify(params));
    if (params.msgType == "methodResponse")
    {
        if(params.hasOwnProperty("params") && params.params.hasOwnProperty("browseContextReply") && params.params.browseContextReply.hasOwnProperty("totalCount"))
        {
            // check number of artists
            if (params.params.browseContextReply.totalCount > 1)
            {
                this._thereIsMoreThanOneArtist(albumName, albumId, action, fromVui, contextPath, params.params);
            }
            else
            {
                this._thereIsOnlyOneArtist(albumName, albumId, action, fromVui, contextPath, params.params);
            }
        }
    }
    else if (params.msgType == "methodErrorResponse")
    {
        log.error("countArtists : BrowseContext request failed!");
        if (this._currentContextTemplate.hasOwnProperty("list2Ctrl") && this._currentContextTemplate.list2Ctrl.setLoading && this._currentContextTemplate.list2Ctrl.inLoading)
        {
            this._currentContextTemplate.list2Ctrl.setLoading(false);
        }

        framework.sendEventToMmui(this.uiaId, "SelectRootFolder");
    }
};

usbaudioApp.prototype._countAlbumsCallback = function (artistName, artistId, action, fromVui, contextPath, params)
{
    log.debug("_countAlbumsCallback");
    if (params.msgType == "methodResponse")
    {
        log.debug("artistName = " + artistName + ", artistId = " + artistId + ", action = " + action + ", contextPath = " + contextPath);

        if(!params.params.browseContextReply.hasOwnProperty("itemList") || params.params.browseContextReply.itemList.length == 0 
           || params.params.browseContextReply.totalCount == 0)
        {
            log.info("Empty list!!!");
            return;
        }

        var totalCount = params.params.browseContextReply.totalCount;
        var lastItem = params.params.browseContextReply.itemList.length - 1;
        if (totalCount > 1)
        {
            if ((!this._isAppleDevice(this._connectedDevs.selectedDevType)) ||
                (params.params.browseContextReply.itemList[lastItem].itemType == this._itemType.USBMS_ItemType_Browsable))
            {
                // send event to go to all albums
                if (action == "browse")
                {
                    framework.sendEventToMmui(this.uiaId, "BrowseArtistGUI", {payload:{artistName: artistName, artistId: artistId}}, fromVui);
                }
                else
                {
                    // TODO: check if first have to show the albums?
                    // select songs of this artist
                    var mdType = [this._mdFilter.USBM_MetadataType_ObjectName];
                    var mdInfo = [{value: artistName, type: this._mdFilter.USBM_MetadataType_ArtistName, item_id: artistId}];
                    var sortSettings = [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}];
                    var newContextPath = "Artist_AllSongs";
                    if (contextPath == "GenresAllArtists")
                    {
                        newContextPath = "GenresAllArtists_Artist_AllSongs";
                    } 
                    else if (contextPath == "GenreArtists")
                    {
                        newContextPath = "Genre_Artist_AllSongs";
                        mdInfo = [{value: this._payloadTable[contextPath].md_info.genre.value, type: this._mdFilter.USBM_MetadataType_GenreName, item_id: this._payloadTable[contextPath].md_info.genre.id}, 
                                  {value: artistName, type: this._mdFilter.USBM_MetadataType_ArtistName, item_id: artistId}];
                    }
                    else 
                    {
                        newContextPath = "Artist_AllSongs";

                    }
                    this._SelectSongsAndPlay(mdType, mdInfo, sortSettings, fromVui, newContextPath);
                }
            }
            else
            {
                if (action == "browse")
                {
                    framework.sendEventToMmui(this.uiaId, "BrowseArtistAlbum", {payload:{artistName: artistName, artistId: artistId, albumName: ""}}, fromVui);
                }
                else
                {
                    var path = "Artist_AllSongs";
                    if (contextPath == "GenresAllArtists")
                    {
                        path = "GenresAllArtists_Artist_AllSongs";
                        var filter = {
                            filterEnum: this._browsingTable[path].browseCategory, 
                            idLevel1: artistId, 
                            idLevel2: this._objectId.USBMS_ObjectID_Invalid,
                            idLevel3: this._objectId.USBMS_ObjectID_Invalid, 
                            sortOrder: this._browsingTable[path].sortOrder
                        };
                    } 
                    else if (contextPath == "GenreArtists")
                    {
                        path = "Genre_Artist_AllSongs";
                        var filter = {
                            filterEnum: this._browsingTable[path].browseCategory, 
                            idLevel1: this._payloadTable[contextPath].md_info.genre.id,
                            idLevel2: artistId,
                            idLevel3: this._objectId.USBMS_ObjectID_Invalid, 
                            sortOrder: this._browsingTable[path].sortOrder
                        };
                    }
                    else 
                    {
                        path = "Artist_AllSongs";
                        var filter = {
                            filterEnum: this._browsingTable[path].browseCategory, 
                            idLevel1: artistId, 
                            idLevel2: this._objectId.USBMS_ObjectID_Invalid,
                            idLevel3: this._objectId.USBMS_ObjectID_Invalid, 
                            sortOrder: this._browsingTable[path].sortOrder
                        };
                    }
                    this._setSongListCategory(filter.filterEnum, null);
                    // play songs of this artist
                    framework.sendEventToMmui(this.uiaId, "PlaySongIndex", {payload:{filter: filter, objectId: 0}}, fromVui);
                }
            }
        }
        else
        {
            var albumName = params.params.browseContextReply.itemList[0].itemName;
            var albumId = params.params.browseContextReply.itemList[0].itemId
            if ((this._connectedDevs.selectedDevType == "UMASS") ||
                (params.params.browseContextReply.itemList[lastItem].itemType == this._itemType.USBMS_ItemType_Browsable))
            {
                if (action == "browse")
                {
                    // send event to go songs of the current albums
                    framework.sendEventToMmui(this.uiaId, "BrowseArtistAlbum", {payload:{artistName: artistName, artistId: artistId, albumName: albumName, albumId: albumId}}, fromVui);
                }
                else
                {
                    // select songs of this artist with this album
                    var mdType = [this._mdFilter.USBM_MetadataType_ObjectName];
                    var mdInfo = [{value: albumName, type: this._mdFilter.USBM_MetadataType_AlbumName, item_id: albumId}, {value: artistName, type: this._mdFilter.USBM_MetadataType_ArtistName, item_id: artistId}];
                    var sortSettings = [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}];
                    var newContextPath = "Artist_OneAlbumSongs";
                    if (contextPath == "GenresAllArtists")
                    {
                        newContextPath = "GenresAllArtists_Artist_OneAlbumSongs";
                    } 
                    else if (contextPath == "GenreArtists")
                    {
                        newContextPath = "Genre_Artist_OneAlbumSongs";
                        mdInfo = [{value: this._payloadTable[contextPath].md_info.genre.value, type: this._mdFilter.USBM_MetadataType_GenreName, item_id: this._payloadTable[contextPath].md_info.genre.id}, 
                                  {value: albumName, type: this._mdFilter.USBM_MetadataType_AlbumName, item_id: albumId}, {value: artistName, type: this._mdFilter.USBM_MetadataType_ArtistName, item_id: artistId}];
                    }
                    else 
                    {
                        newContextPath = "Artist_OneAlbumSongs";
                    }
                    this._SelectSongsAndPlay(mdType, mdInfo, sortSettings, fromVui, newContextPath);
                }
            }
            else
            {
                if (action == "browse")
                {
                    // send event to go songs of the current albums
                    framework.sendEventToMmui(this.uiaId, "BrowseArtistAlbum", {payload:{artistName: artistName, artistId: artistId, albumName: albumName, albumId: albumId}}, fromVui);
                }
                else
                {
                    var path = "Artist_OneAlbumSongs";
                    if (contextPath == "GenresAllArtists")
                    {
                        path = "GenresAllArtists_Artist_OneAlbumSongs";
                        var filter = {
                            filterEnum: this._browsingTable[path].browseCategory, 
                            idLevel1: artistId, 
                            idLevel2: albumId,
                            idLevel3: this._objectId.USBMS_ObjectID_Invalid, 
                            sortOrder: this._browsingTable[path].sortOrder
                        };
                    } 
                    else if (contextPath == "GenreArtists")
                    {
                        path = "Genre_Artist_OneAlbumSongs";
                        var filter = {
                            filterEnum: this._browsingTable[path].browseCategory, 
                            idLevel1: this._payloadTable[contextPath].md_info.genre.id, 
                            idLevel2: artistId, 
                            idLevel3: albumId,
                            sortOrder: this._browsingTable[path].sortOrder
                        };
                    }
                    else 
                    {
                        path = "Artist_OneAlbumSongs";
                        var filter = {
                            filterEnum: this._browsingTable[path].browseCategory, 
                            idLevel1: artistId, 
                            idLevel2: albumId,
                            idLevel3: this._objectId.USBMS_ObjectID_Invalid, 
                            sortOrder: this._browsingTable[path].sortOrder
                        };
                    }
                    this._setSongListCategory(filter.filterEnum, null);
                    // play songs of this artist with this album
                    framework.sendEventToMmui(this.uiaId, "PlaySongIndex", {payload:{filter: filter, objectId: 0}}, fromVui);
                }
            }
        }
    }
    else if (params.msgType == "methodErrorResponse")
    {
        log.error("USBAUDIO: BrowseContext request failed!");
        if (this._currentContextTemplate.hasOwnProperty("list2Ctrl") && this._currentContextTemplate.list2Ctrl.setLoading && this._currentContextTemplate.list2Ctrl.inLoading)
        {
            this._currentContextTemplate.list2Ctrl.setLoading(false);
        }

        framework.sendEventToMmui(this.uiaId, "SelectRootFolder");
    }
};

usbaudioApp.prototype._SelectSongsAndPlay = function (md_types, md_info, sort_settings, fromVui, contextPath)
{
    log.info("_SelectSongsAndPlay called contextPath = " + contextPath);
    log.debug("md_types = " + md_types + " md_info = " + JSON.stringify(md_info) + " currentContextId = " + this._currentContextId );
   
    var path = "Invalid";
    if (this._existBrowsingTable(contextPath))
    {   
        path = contextPath;
    }
    else if (this._existBrowsingTable(this._currentContextId))
    {
        path = this._currentContextId;
    }
    this._setIdLevelForMdInfoList(md_info, path);
    var filter = this._createFilter(path);
    
    // playListName is for MLT 
    var playListName = "";
    if (path == "PlaylistSongs")
    {
        playListName = this._payloadTable[path].md_info.playlist.value;
    }

	var params = {
		"browseContext":{
		    "deviceId": this._connectedDevs.deviceSelected,
		    "filterList": {
                "filter": [filter]
            },
            "playListName": playListName,
		    "offset": 0,
            "count": 2
        }, 
		"browseContext_sz": {
            "filterList_sz": {
                "filter_sz": [filter].length
            } 
        }
	};

	/// why limit to 2??? 2015.03.05 AN
	params.browseContext.count = 20;

	if(contextPath == "Audiobooks")
	{
	    params.browseContext.count = 20;
	}

    log.debug("params = " + JSON.stringify(params));
    framework.sendRequestToAppsdk(this.uiaId, this._PlaySongs.bind(this, filter, md_info, fromVui, contextPath), "usbms", "BrowseContext", params);
};

usbaudioApp.prototype._selectData = function (msg, fromVui)
{
    var contextPath = msg.params.payload.path;
    var mdTypeList = this._payloadTable[contextPath].md_types;
    var mdInfoList = this._createMdInfoFromMsg(msg);
    var sortSettings = this._payloadTable[msg.params.payload.path].sort_settings;
    if (mdInfoList.length < 2)
    {
        switch (mdTypeList[0])
        {
            case 2: // SBM_MetadataType_ObjectName
                if (msg.params.payload.path == "PodcastEpisodes" && msg.params.payload.metadata.episodeName == "")
                {
                    // play all episodes
                    this._SelectSongsAndPlay(mdTypeList, [{value: msg.params.payload.metadata.podcastName, type: this._mdFilter.USBM_MetadataType_Podcast, item_id: msg.params.payload.metadata.podcastId}], 
                                                           sortSettings, fromVui, contextPath);
                }
                else if (msg.params.payload.path == "PodcastEpisodes" && msg.params.payload.metadata.episodeName != "")
                {
                    // play episodes
                    this._SelectSongsAndPlay(mdTypeList, [{value: msg.params.payload.metadata.podcastName, type: this._mdFilter.USBM_MetadataType_Podcast, item_id: msg.params.payload.metadata.podcastId}, 
                                                          {value: msg.params.payload.metadata.episodeName, type: this._mdFilter.USBM_MetadataType_ObjectName, item_id: msg.params.payload.metadata.episodeId}], 
                                                           sortSettings, fromVui, contextPath);
                }
                else if (msg.params.payload.path == "AudiobookChapters")
                {
                    this._SelectSongsAndPlay(mdTypeList, [{value: msg.params.payload.metadata.audiobookName, type: this._mdFilter.USBM_MetadataType_Kind, item_id: msg.params.payload.metadata.audiobookId}, 
                                                          {value: msg.params.payload.metadata.chapterName, type: this._mdFilter.USBM_MetadataType_ObjectName, item_id: msg.params.payload.metadata.chapterId}], 
                                                           sortSettings, fromVui, contextPath);
                }
                else
                {
                    this._SelectSongsAndPlay(mdTypeList, mdInfoList, sortSettings, fromVui, contextPath);
                }
                break;
            case 4: // USBM_MetadataType_AlbumName
                this._countArtists(msg.params.payload.albumName, msg.params.payload.albumId, "play", fromVui, contextPath);
                break;
            case 5: // USBM_MetadataType_ArtistName
                this._countAlbums(msg.params.payload.artistName, "play", msg.params.payload.artistId, fromVui, contextPath);
                break;
            case 24: // USBM_MetadataType_Kind
                if (msg.params.payload.path == "Audiobooks" && msg.params.payload.metadata.audiobookName == "")
                {
                    this._SelectSongsAndPlay(mdTypeList, mdInfoList, sortSettings, fromVui, contextPath);
                }
                else if (msg.params.payload.path == "Audiobooks" && msg.params.payload.metadata.audiobookName != "")
                {
                    log.info("Audiobook name is : ", msg.params.payload.metadata.audiobookName);
                    // Use call propty to resolve "this" object
                    var selectAudiobook = function(audiobookId, audiobookName, type, index, contextPath)
                    {
                        var md_type = this._mdFilter.USBM_MetadataType_ObjectName;
                        if (type == this._itemType.USBMS_ItemType_Browsable)
                        {
                            md_type = this._mdFilter.USBM_MetadataType_AlbumName;
                        }
                        framework.sendEventToMmui(this.uiaId, "SetAudiobookType", {payload:{audiobookType: type}}, fromVui);
                        if (md_type == this._mdFilter.USBM_MetadataType_AlbumName) /// ( == 4) actually, the Audiobook Name
                        {
                            this._SelectSongsAndPlay(null, [{value: audiobookName, type: this._mdFilter.USBM_MetadataType_Kind, item_id: audiobookId}],
                                                        sortSettings, fromVui, contextPath);
                        }
                        else if (md_type == this._mdFilter.USBM_MetadataType_ObjectName) /// ( == 2) actually, the Chapter name
                        {
                            this._clearMetadata();
                            this._clearTotalElapsedTime();
                            var filter = this._createFilter(this._currentContextId);
                            this._setSongListCategory(filter.filterEnum, null);
                            framework.sendEventToMmui(this.uiaId, "PlaySongIndex", {payload:{filter: filter, objectId: index}}, fromVui);
                        }
                    }
                    // Case on VR(Say "Play audiobook name"), list2Ctrl has invalid dataList(items is null).
                    var thisBook = this._getListItemByText(msg.params.payload.metadata.audiobookName);
                    if (thisBook.index == -1)
                    {
                        this._getAudiobookType(msg.params.payload.metadata.audiobookName, selectAudiobook, "play", true, contextPath, 0);
                    }
                    else
                    {
                        selectAudiobook.call(this, msg.params.payload.metadata.audiobookId, msg.params.payload.metadata.audiobookName, thisBook.item.appData.type, thisBook.index, contextPath);
                    }
                }
                break;
            case 26: // USBM_MetadataType_Podcast
                this._SelectSongsAndPlay(this._payloadTable["PodcastEpisodes"].md_types, mdInfoList, this._payloadTable["PodcastEpisodes"].sort_settings, fromVui, contextPath);
                break;
        }
    }
    else if (fromVui == true && this._isAppleDevice(this._connectedDevs.selectedDevType) && msg.params.payload.path == "Artist_AlbumSongs")
    {
        this._convertAlbumId(msg.params.payload.metadata.albumName, "play", msg.params.payload.metadata.artistName, msg.params.payload.metadata.artistId, null, null, true, contextPath, 0);
    }
    else
    {
        this._SelectSongsAndPlay(mdTypeList, mdInfoList, sortSettings, fromVui, contextPath);
    }
};

usbaudioApp.prototype._countArtistAlbums = function (path, genreId, artistId)
{
    log.debug("_countArtistAlbums called");

    var filterList = new Array();

    if (path == "Genre_Artist_AlbumSongs")
    {
        filterList.push({
                         filterEnum: this._browsingTable["Genre_ArtistAlbums"].browseCategory,
                         idLevel1: genreId,
                         idLevel2: artistId,
                         idLevel3: this._objectId.USBMS_ObjectID_Invalid,
                         sortOrder: this._browsingTable["Genre_ArtistAlbums"].sortOrder
                       });
    }
    else 
    {
        // case path is "Artist_AlbumSongs"
        filterList.push({
                         filterEnum: this._browsingTable["ArtistAlbums"].browseCategory,
                         idLevel1: artistId,
                         idLevel2: this._objectId.USBMS_ObjectID_Invalid,
                         idLevel3: this._objectId.USBMS_ObjectID_Invalid,
                         sortOrder: this._browsingTable["ArtistAlbums"].sortOrder
                       });
    }

    var params = {
        "browseContext":{
            "deviceId": this._connectedDevs.deviceSelected,
            "filterList": {
                "filter": filterList
            },
           "playListName": "",
           "offset": 0,
           "count": 5
        },
        "browseContext_sz": {
            "filterList_sz": {
                "filter_sz": filterList.length
            }
        }
    };

    log.debug("params = " + JSON.stringify(params)); 
    framework.sendRequestToAppsdk(this.uiaId, this._countArtistAlbumsCallback.bind(this, false), "usbms", "BrowseContext", params);
};

usbaudioApp.prototype._getListItemByText = function (itemText){
    result = {
        item: {
            appData: {
                name: itemText,
                id: 0,
                type: this._mdFilter.USBM_MetadataType_AlbumName
            }
        },
        index: -1
    };

    //Need to check whether the name is "undefined".(Selected not displayed items on VR prompt) 
    if (this._currentContextId == "Audiobooks" &&
        this._currentContextTemplate.hasOwnProperty("list2Ctrl"))
    {
        j = 0;
        while (j < this._currentContextTemplate.list2Ctrl.dataList.items.length && result.index == -1)
        {
            if (this._currentContextTemplate.list2Ctrl.dataList.items[j].appData.name &&
                itemText.toLowerCase() == this._currentContextTemplate.list2Ctrl.dataList.items[j].appData.name.toLowerCase())
            {
                log.debug("Found element with name " + itemText + " at index " + j);
                result.item = this._currentContextTemplate.list2Ctrl.dataList.items[j];
                result.index = j;
            }
            j++;
        }
    }

    return result;
};

usbaudioApp.prototype._PlaySongs = function (filter, md_info, fromVui, contextPath, params)
{
    log.debug("_PlaySongs called");
    this._clearMetadata();
    this._clearTotalElapsedTime();

    if (params.msgType == "methodResponse")
    {
        // objectId is offset in filter
        // in case of iAP1, item_id is offset
        var objectIndex = 0;
        var index = md_info.length - 1;

        this._setSongListCategory(filter.filterEnum, null);
        if (contextPath != "PodcastEpisodes" && contextPath != "Chapters" && contextPath != "AudiobookChapters")
        {
            if (contextPath == "Podcasts")
            {
                objectIndex = 0;
                filter.idLevel1 = md_info[0].item_id;
                filter.filterEnum = this._browsingTable["PodcastEpisodes"].browseCategory;
            }
            else if (contextPath == "Audiobooks")
            {
                objectIndex = md_info[index].item_id;
            }

            log.debug("filter = " + JSON.stringify([filter]) + " objectId = " + objectIndex);
            framework.sendEventToMmui(this.uiaId, "PlaySongIndex", {payload:{filter: filter, objectId: objectIndex}}, params.fromVui);
        }
        else if (contextPath == "PodcastEpisodes")
        {
            if (index != 0)
            {
                // play episodes index
                objectIndex = md_info[index].item_id;
            }
            else
            {
                // play all episodes
                objectIndex = 0;
            }
            log.debug("filter = " + JSON.stringify([filter]) + " objectId = " + objectIndex);
            framework.sendEventToMmui(this.uiaId, "PlayEpisodeIndex", {payload:{filter : filter, objectId : objectIndex}}, params.fromVui);
		}
        else 
        {
            if (contextPath == "AudiobookChapters")
            {
               if (md_info[index].value == "allChapters")
               {
                   if(params.hasOwnProperty("params") && params.params.hasOwnProperty("browseContextReply") && 
                      params.params.browseContextReply.hasOwnProperty("itemList") && params.params.browseContextReply.itemList.length == 0)
                   {
                      // play Audiobook 
                      var lpath = "Audiobooks";
                      var lFilter = {
                              filterEnum: this._browsingTable[lpath].browseCategory,
                              idLevel1: this._browsingTable[lpath].idLevel1.id,
                              idLevel2: this._browsingTable[lpath].idLevel2.id,
                              idLevel3: this._browsingTable[lpath].idLevel3.id,
                              sortOrder: this._browsingTable[lpath].sortOrder
                          };
                      objectIndex = md_info[0].item_id;
                      log.debug("filter = " + JSON.stringify([lFilter]) + " objectId = " + objectIndex);
                      framework.sendEventToMmui(this.uiaId, "PlaySongIndex", {payload:{filter : lFilter, objectId : objectIndex}}, params.fromVui);
                   }
                   else
                   {
                      // play chapter index 0
                      objectIndex = 0;
                      log.debug("filter = " + JSON.stringify([filter]) + " objectId = " + objectIndex);
                      framework.sendEventToMmui(this.uiaId, "PlaySongIndex", {payload:{filter : filter, objectId : objectIndex}}, params.fromVui);
                   }
               }
               else
               {
                   // play chapter
                   objectIndex = md_info[index].item_id;
                   log.debug("filter = " + JSON.stringify([filter]) + " objectId = " + objectIndex);
                   framework.sendEventToMmui(this.uiaId, "PlaySongIndex", {payload:{filter : filter, objectId : objectIndex}}, params.fromVui);
               }
            }
            else
            {
                // play Audiobook or chapter
                objectIndex = md_info[index].item_id;
                log.debug("filter = " + JSON.stringify([filter]) + " objectId = " + objectIndex);
                framework.sendEventToMmui(this.uiaId, "PlayChapterIndex", {payload:{filter : filter, objectId : objectIndex}}, params.fromVui);
            }
        }
    }
    else if (params.msgType == "methodErrorResponse")
    {
        log.error("SelectSongsAndPlay : BrowseContext request failed!");
        if (this._currentContextTemplate.hasOwnProperty("list2Ctrl") && this._currentContextTemplate.list2Ctrl.setLoading && this._currentContextTemplate.list2Ctrl.inLoading)
        {
            this._currentContextTemplate.list2Ctrl.setLoading(false);
        }

        framework.sendEventToMmui(this.uiaId, "SelectRootFolder");
    }
};

usbaudioApp.prototype._setIdLevel = function (data)
{
    var path = "Invalid";
    if (this._existBrowsingTable(this._currentContextId))
    {   
        path = this._currentContextId
    }
    if (data.hasOwnProperty("artist"))
    {
        if (this._browsingTable[path].idLevel1.name == "artist")
        {
            this._browsingTable[path].idLevel1.id = data.artist.id;
        }
        else if (this._browsingTable[path].idLevel2.name == "artist")
        {
            this._browsingTable[path].idLevel2.id = data.artist.id;
        }
        else if (this._browsingTable[path].idLevel3.name == "artist")
        {
            this._browsingTable[path].idLevel3.id = data.artist.id;
        }
    }

    if (data.hasOwnProperty("album"))
    {
        if (this._browsingTable[path].idLevel1.name == "album")
        {
            this._browsingTable[path].idLevel1.id = data.album.id;
        }
        else if (this._browsingTable[path].idLevel2.name == "album")
        {
            this._browsingTable[path].idLevel2.id = data.album.id;
        }
        else if (this._browsingTable[path].idLevel3.name == "album")
        {
            this._browsingTable[path].idLevel3.id = data.album.id;
        }
    }

    if (data.hasOwnProperty("genre"))
    {
        if (this._browsingTable[path].idLevel1.name == "genre")
        {
            this._browsingTable[path].idLevel1.id = data.genre.id;
        }
        else if (this._browsingTable[path].idLevel2.name == "genre")
        {
            this._browsingTable[path].idLevel2.id = data.genre.id;
        }
        else if (this._browsingTable[path].idLevel3.name == "genre")
        {
            this._browsingTable[path].idLevel3.id = data.genre.id;
        }
    }

    if (data.hasOwnProperty("audiobook"))
    {
        if (this._browsingTable[path].idLevel1.name == "audiobook")
        {
            this._browsingTable[path].idLevel1.id = data.audiobook.id;
        }
        else if (this._browsingTable[path].idLevel2.name == "audiobook")
        {
            this._browsingTable[path].idLevel2.id = data.audiobook.id;
        }
        else if (this._browsingTable[path].idLevel3.name == "audiobook")
        {
            this._browsingTable[path].idLevel3.id = data.audiobook.id;
        }
    }

    if (data.hasOwnProperty("podcast"))
    {
        if (this._browsingTable[path].idLevel1.name == "podcast")
        {
            this._browsingTable[path].idLevel1.id = data.podcast.id;
        }
        else if (this._browsingTable[path].idLevel2.name == "podcast")
        {
            this._browsingTable[path].idLevel2.id = data.podcast.id;
        }
        else if (this._browsingTable[path].idLevel3.name == "podcast")
        {
            this._browsingTable[path].idLevel3.id = data.podcast.id;
        }
    }

    if (data.hasOwnProperty("playlist"))
    {
        if (this._browsingTable[path].idLevel1.name == "playlist")
        {
            this._browsingTable[path].idLevel1.id = data.playlist.id;
        }
        else if (this._browsingTable[path].idLevel2.name == "playlist")
        {
            this._browsingTable[path].idLevel2.id = data.playlist.id;
        }
        else if (this._browsingTable[path].idLevel3.name == "playlist")
        {
            this._browsingTable[path].idLevel3.id = data.playlist.id;
        }
    }

    if (data.hasOwnProperty("song"))
    {
        if (this._browsingTable[path].idLevel1.name == "song")
        {
            this._browsingTable[path].idLevel1.id = data.song.id;
        }
        else if (this._browsingTable[path].idLevel2.name == "song")
        {
            this._browsingTable[path].idLevel2.id = data.song.id;
        }
        else if (this._browsingTable[path].idLevel3.name == "song")
        {
            this._browsingTable[path].idLevel3.id = data.song.id;
        }
    }
};

usbaudioApp.prototype._setIdLevelForMdInfoList = function (dataList, contextId)
{
    var path = contextId;
    for (var i = 0; i < dataList.length; i++)
    {
        if (!dataList[i].hasOwnProperty("type") || !dataList[i].hasOwnProperty("item_id"))
        {
            continue;
        }
        
        if (dataList[i].type == this._mdFilter.USBM_MetadataType_ArtistName)
        {
            if (this._browsingTable[path].idLevel1.name == "artist")
            {
                this._browsingTable[path].idLevel1.id = dataList[i].item_id;
            }
            else if (this._browsingTable[path].idLevel2.name == "artist")
            {
                this._browsingTable[path].idLevel2.id = dataList[i].item_id;
            }
            else if (this._browsingTable[path].idLevel3.name == "artist")
            {
                this._browsingTable[path].idLevel3.id = dataList[i].item_id;
            }
        }

        if(dataList[i].type == this._mdFilter.USBM_MetadataType_AlbumName)
        {
            if (this._browsingTable[path].idLevel1.name == "album")
            {
                this._browsingTable[path].idLevel1.id = dataList[i].item_id;
            }
            else if (this._browsingTable[path].idLevel2.name == "album")
            {
                this._browsingTable[path].idLevel2.id = dataList[i].item_id;
            }
            else if (this._browsingTable[path].idLevel3.name == "album")
            {
                this._browsingTable[path].idLevel3.id = dataList[i].item_id;
            }
        }

        if(dataList[i].type == this._mdFilter.USBM_MetadataType_GenreName)
        {
            if (this._browsingTable[path].idLevel1.name == "genre")
            {
                this._browsingTable[path].idLevel1.id = dataList[i].item_id;
            }
            else if (this._browsingTable[path].idLevel2.name == "genre")
            {
                this._browsingTable[path].idLevel2.id = dataList[i].item_id;
            }
            else if (this._browsingTable[path].idLevel3.name == "genre")
            {
                this._browsingTable[path].idLevel3.id = dataList[i].item_id;
            }
        }

        // audiobook chapters
        if(dataList[i].type == this._mdFilter.USBM_MetadataType_Kind)
        {
            if (this._browsingTable[path].idLevel1.name == "audiobook")
            {
                this._browsingTable[path].idLevel1.id = dataList[i].item_id;
            }
            else if (this._browsingTable[path].idLevel2.name == "audiobook")
            {
                this._browsingTable[path].idLevel2.id = dataList[i].item_id;
            }
            else if (this._browsingTable[path].idLevel3.name == "audiobook")
            {
                this._browsingTable[path].idLevel3.id = dataList[i].item_id;
            }
        }

        // podcast episodes
        if(dataList[i].type == this._mdFilter.USBM_MetadataType_Podcast)
        {
            if (this._browsingTable[path].idLevel1.name == "podcast")
            {
                this._browsingTable[path].idLevel1.id = dataList[i].item_id;
            }
            else if (this._browsingTable[path].idLevel2.name == "podcast")
            {
                this._browsingTable[path].idLevel2.id = dataList[i].item_id;
            }
            else if (this._browsingTable[path].idLevel3.name == "podcast")
            {
                this._browsingTable[path].idLevel3.id = dataList[i].item_id;
            }
        }

        if(dataList[i].type == this._mdFilter.USBM_MetadataType_PlaylistName)
        {
            if (this._browsingTable[path].idLevel1.name == "playlist")
            {
                this._browsingTable[path].idLevel1.id = dataList[i].item_id;
            }
            else if (this._browsingTable[path].idLevel2.name == "playlist")
            {
                this._browsingTable[path].idLevel2.id = dataList[i].item_id;
            }
            else if (this._browsingTable[path].idLevel3.name == "playlist")
            {
                this._browsingTable[path].idLevel3.id = dataList[i].item_id;
            }
        }

        // song
        if(dataList[i].type == this._mdFilter.USBM_MetadataType_Unknown)
        {
            if (this._browsingTable[path].idLevel1.name == "song")
            {
                this._browsingTable[path].idLevel1.id = dataList[i].item_id;
            }
            else if (this._browsingTable[path].idLevel2.name == "song")
            {
                this._browsingTable[path].idLevel2.id = dataList[i].item_id;
            }
            else if (this._browsingTable[path].idLevel3.name == "song")
            {
                this._browsingTable[path].idLevel3.id = dataList[i].item_id;
            }
        }
    }
};

usbaudioApp.prototype._existBrowsingTable = function (contextId)
{
    var ret = false;
    if (contextId in this._browsingTable)
    {
        ret = true;
        log.debug("contextId(" + contextId + ") exist ");
    }
    else
    {
        log.debug("contextId(" + contextId + ") do not exist ");
    }
    return ret;
};

usbaudioApp.prototype._isAppleDevice = function (deviceType)
{
    var ret = false;
    if (deviceType == "IPOD" || deviceType == "IAP1" || deviceType == "IAP2")
    {
        ret = true;
    }

    return ret;
};

usbaudioApp.prototype._convertEmptyToUnknown = function (context, value)
{
    var retStr = "";
    if (context == "Artists")
    {
        if (value)
        {
            retStr = value;
        }
        else
        {
            retStr = "Unknown Artist";
        }
    }
    else if (context == "Albums")
    {
        if (value)
        {
            retStr = value;
        }
        else
        {
            retStr = "Unknown Album";
        }
    }
    else if (context == "Genres")
    {
        if (value)
        {
            retStr = value;
        }
        else
        {
            retStr = "Unknown Genre";
        }
    }
    else if (context == "Songs")
    {
        if (value)
        {
            retStr = value;
        }
        else
        {
            retStr = "Unknown Track";
        }
    }
    else 
    {
        // return value except Artist, Album, Songs
        if (value)
        {
            retStr = value;
        }
    }

    return retStr;
};

usbaudioApp.prototype._setSongListCategory = function (category, playListName)
{
    var songListCategory = "";
    switch(category)
    {
        case this._browseCategory.USBMS_BROWSE_GENRES:
        case this._browseCategory.USBMS_BROWSE_ARTISTS:
        case this._browseCategory.USBMS_BROWSE_ALBUMS:
        case this._browseCategory.USBMS_BROWSE_ALL_SONGS:
        case this._browseCategory.USBMS_BROWSE_ALL_PLAYLISTS:
        case this._browseCategory.USBMS_BROWSE_GENRE_ARTISTS:
        case this._browseCategory.USBMS_BROWSE_GENRE_ALBUM:
        case this._browseCategory.USBMS_BROWSE_GENRE_ARTIST_ALBUM:
        case this._browseCategory.USBMS_BROWSE_ARTIST_ALBUMS:
        case this._browseCategory.USBMS_BROWSE_ALBUM_ARTIST:
        case this._browseCategory.USBMS_BROWSE_ALBUM_SONGS:
        case this._browseCategory.USBMS_BROWSE_ALBUM_ARTIST_SONGS:
        case this._browseCategory.USBMS_BROWSE_ARTIST_ALBUM_SONGS:
        case this._browseCategory.USBMS_BROWSE_ARTIST_SONGS:
        case this._browseCategory.USBMS_BROWSE_GENRE_ARTIST_ALBUM_SONGS:
        case this._browseCategory.USBMS_BROWSE_GENRE_ARTIST_SONGS:
        case this._browseCategory.USBMS_BROWSE_GENRE_ALBUM_SONGS:
        case this._browseCategory.USBMS_BROWSE_GENRE_SONGS:
        case this._browseCategory.USBMS_BROWSE_PODCASTS:
        case this._browseCategory.USBMS_BROWSE_PODCAST_SONGS:
        case this._browseCategory.USBMS_BROWSE_AUDIOBOOKS:
        case this._browseCategory.USBMS_BROWSE_AUDIOBOOKS_CHAPTERS:
            songListCategory = "metadata";
            break;
        case this._browseCategory.USBMS_BROWSE_ALL_CONTENTS_IN_FOLDER:
        case this._browseCategory.USBMS_BROWSE_ALL_SUBFOLDER_ENTRIES_IN_FOLDER:
            songListCategory = "folder";
            break;
        case this._browseCategory.USBMS_BROWSE_PLAYLIST_ENTRIES:
            songListCategory = "metadata";
            if (playListName && playListName == "More Like This")
            {
                songListCategory = "mlt"; 
            } 
            break;
        default :
            songListCategory = "";
            break;
    }
    log.debug("songListCategory = " + songListCategory);

    this._connectedDevs.songListCategory = songListCategory;
    if (this._connectedDevs.deviceSelected == this._connectedDevs.A.deviceId)
    {
        this._connectedDevs.A.songListCategory = this._connectedDevs.songListCategory;
    }
    else if (this._connectedDevs.deviceSelected == this._connectedDevs.B.deviceId)
    {
        this._connectedDevs.B.songListCategory = this._connectedDevs.songListCategory;
    }
};

usbaudioApp.prototype._removeExtention = function (itemName)
{
    var retStr = itemName;
    if (itemName)
    {
        var tmpArray = itemName.split(/(?=\.[^.]+$)/);
        if (tmpArray.length > 0)
        {
            retStr = tmpArray[0];
        }
    }
    return retStr;
}

usbaudioApp.prototype._getItemInfoCallback = function (offset, searchName, success, retry, params)
{
    if (params.msgType == "methodResponse")
    {
        if(!params.params.browseContextReply.hasOwnProperty("itemList") || params.params.browseContextReply.itemList.length == 0 
           || params.params.browseContextReply.totalCount == 0)
        {
            log.info("Empty list!!!");
            return;
        }

        var totalCount = params.params.browseContextReply.totalCount;
        var resultCount = params.params.browseContextReply.itemList.length;
        var item = null;
        var totalIndex = 0;
        log.debug("totalCount = ", totalCount, ", resultCount = " + resultCount);
        if (totalCount > 1)
        {
            // check Album Name
            for (var i = 0; i < resultCount; i++)
            {
                log.debug("index = ", i, ", itemName = " + params.params.browseContextReply.itemList[i].itemName + ", itemId = " + params.params.browseContextReply.itemList[i].itemId);
                if (params.params.browseContextReply.itemList[i].itemName == searchName)
                {
                    item = params.params.browseContextReply.itemList[i];
                    totalIndex = offset + i;
                    break;
                }
            }
        }

        if (item != null)
        {
            // To use usbaudioApp object in success function.
            success.call(this, item, totalIndex);
        }
        else
        {
            if ((offset + resultCount) < totalCount) {

                // To use usbaudioApp object in retry function.
                retry.call(this, (offset + resultCount));
            }
            else
            {
                log.info("Not found!!!");
            }
        }

    }
    else if (params.msgType == "methodErrorResponse")
    {
        log.error("USBAUDIO: BrowseContext request failed!");
        if (this._currentContextTemplate.hasOwnProperty("list2Ctrl") && this._currentContextTemplate.list2Ctrl.setLoading && this._currentContextTemplate.list2Ctrl.inLoading)
        {
            this._currentContextTemplate.list2Ctrl.setLoading(false);
        }

        framework.sendEventToMmui(this.uiaId, "SelectRootFolder");
    }
};

usbaudioApp.prototype._convertAlbumIdCallback = function (offset, albumName, artistName, artistId, genreName, genreId, action, fromVui, contextPath, params)
{
    log.debug("_convertAlbumIdCallback");
    var success = function(item)
    {
        var albumId = item.itemId;
        log.debug("Album Found! offset = ", offset, ", albumName = " + albumName + ", artistName = " + artistName + ", artistId = " + artistId + ", genreName = " + genreName + ", genreId = " + genreId + ", action = " + action + ", contextPath = " + contextPath);
        if (action == "play")
        {
            // Album Name matched
            var md_info = this._createAlbumDisambiguateMdInfo(artistName, artistId, albumName, albumId, genreName, genreId);
            var path = this._playDisambiguatePathTable[contextPath];
            if (!path)
            {
                path = contextPath;
            }
            // make selection and play songs
            this._SelectSongsAndPlay(
                [this._mdFilter.USBM_MetadataType_ObjectName],
                md_info,
                [{metadata_type: this._mdFilter.USBM_MetadataType_ObjectName, sort_order: this._soFilter.USBM_SortOrder_AlphaAscending}], true, path);
        }
        else
        {
            framework.sendEventToMmui(this.uiaId, "BrowseAlbumArtist", {payload:{albumName: albumName, albumId: albumId}}, true);
        }
    };
    var retry = function(nextOffset)
    {
        this._convertAlbumId(albumName,
                            action,
                            artistName, artistId,
                            genreName, genreId,
                            true,
                            contextPath,
                            nextOffset);
    };

    this._getItemInfoCallback(offset, albumName, success, retry, params);
}

// convert Album ID.(for Apple Device)
usbaudioApp.prototype._convertAlbumId = function (albumName, action, artistName, artistId, genreName, genreId, fromVui, contextPath, offset)
{
    log.debug("_convertAlbumId called");

    var params = this._createAlbumFilter(offset, artistId, contextPath);

    log.debug("params = " + JSON.stringify(params));
    framework.sendRequestToAppsdk(this.uiaId, this._convertAlbumIdCallback.bind(this, offset, albumName, artistName, artistId, genreName, genreId, action, fromVui, contextPath), "usbms", "BrowseContext", params);
};

usbaudioApp.prototype._getAudiobookTypeCallback = function (offset, audiobookName, playFunction, action, fromVui, contextPath, params)
{
    log.debug("_getAudiobookTypeCallback");
    var success = function(item, index)
    {
        log.debug("Audiobook Found! index = ", index, ", name = " + item.itemName + ", id = " + item.itemId + ", type = " + item.itemType + ", action = " + action + ", contextPath = " + contextPath);
        playFunction.call(this, item.itemId, item.itemName, item.itemType, index, contextPath);
    };
    var retry = function(nextOffset)
    {
        this._getAudiobookType(audiobookName,
                            action,
                            true,
                            contextPath,
                            nextOffset);
    };

    this._getItemInfoCallback(offset, audiobookName, success, retry, params);
}

// Get Audiobook Type.(for VR)
usbaudioApp.prototype._getAudiobookType = function (audiobookName, playFunction, action, fromVui, contextPath, offset)
{
    log.debug("_getAudiobookType called");

    var filterList = new Array();
    var path = contextPath;
    filterList.push({
                filterEnum: this._browsingTable[path].browseCategory,
                idLevel1: this._browsingTable[path].idLevel1.id,
                idLevel2: this._browsingTable[path].idLevel2.id,
                idLevel3: this._browsingTable[path].idLevel3.id,
                sortOrder: this._browsingTable[path].sortOrder
    });

    var params = {
        "browseContext":{
            "deviceId": this._connectedDevs.deviceSelected,
            "filterList": {
                "filter": filterList
            },
            "playListName": "",
            "offset": offset,
            "count": 5
        },
        "browseContext_sz": {
            "filterList_sz": {
                "filter_sz": filterList.length
            }
        }
    };
    log.debug("params = " + JSON.stringify(params));

    framework.sendRequestToAppsdk(this.uiaId, this._getAudiobookTypeCallback.bind(this, offset, audiobookName, playFunction ,action, fromVui, contextPath), "usbms", "BrowseContext", params);
}

framework.registerAppLoaded("usbaudio", null, true);
