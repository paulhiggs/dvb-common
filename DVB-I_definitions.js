const PAGINATION_PREFIX = "urn:fvc:metadata:cs:HowRelatedCS:2015-12:pagination:";
const CRID_NOW_NEXT_PREFIX = "crid://dvb.org/metadata/schedules/now-next/";

const FILE_FORMAT_CS = "urn:mpeg:mpeg7:cs:FileFormatCS:2001";

const DVB_SOURCE_PREFIX = "urn:dvb:metadata:source";
const LINKED_APLICATION_CS = "urn:dvb:metadata:cs:LinkedApplicationCS:2019";
const DVB_RELATED_CS_v1 = "urn:dvb:metadata:cs:HowRelatedCS:2019";
const DVB_RELATED_CS_v2 = "urn:dvb:metadata:cs:HowRelatedCS:2020";


module.exports = Object.freeze({
	A177v1_Namespace: "urn:dvb:metadata:servicediscovery:2019",
    A177v2_Namespace: "urn:dvb:metadata:servicediscovery:2020",
	
    MAX_TITLE_LENGTH: 80,
    MAX_KEYWORD_LENGTH: 32,
	MAX_ORGANIZATION_NAME_LENGTH: 32,
	MAX_NAME_PART_LENGTH: 32,
	MAX_EXPLANATORY_TEXT_LENGTH: 160,
	
	SYNOPSIS_SHORT_LABEL: "short",
	SYNOPSIS_SHORT_LENGTH: 90,
	
    SYNOPSIS_MEDIUM_LABEL: "medium", 
    SYNOPSIS_MEDIUM_LENGTH: 250, 
	
    SYNOPSIS_LONG_LABEL: "long",
	SYNOPSIS_LONG_LENGTH: 1200, 
	
	XML_AIT_CONTENT_TYPE: "application/vnd.dvb.ait+xml",
    TEMPLATE_AIT_URI: "urn:fvc:metadata:cs:HowRelatedCS:2018:templateAIT",
    
	PAGINATION_FIRST_URI: PAGINATION_PREFIX+"first",
	PAGINATION_PREV_URI: PAGINATION_PREFIX+"prev",
	PAGINATION_NEXT_URI: PAGINATION_PREFIX+"next",
	PAGINATION_LAST_URI : PAGINATION_PREFIX+"last",
	  
	CRID_NOW: CRID_NOW_NEXT_PREFIX+"now",
	CRID_LATER: CRID_NOW_NEXT_PREFIX+"later",
	CRID_EARLIER: CRID_NOW_NEXT_PREFIX+"earlier", 
	
	PROMOTIONAL_STILL_IMAGE_URI: "urn:tva:metadata:cs:HowRelatedCS:2012:19",
	
	MAX_SUBREGION_LEVELS: 3, // definied for <RegionElement> in Table 33 of A177

    JPEG_IMAGE_CS_VALUE: FILE_FORMAT_CS+":1",
    PNG_IMAGE_CS_VALUE: FILE_FORMAT_CS+":15",	
	
	EIT_PROGRAMME_CRID_TYPE: "eit-programme-crid",
	EIT_SERIES_CRID_TYPE: "eit-series-crid",

	DEFAULT_KEYWORD_TYPE: "main",
	KEYWORD_TYPE_MAIN: "main",
	KEYWORD_TYPE_OTHER: "other",
	
	DEFAULT_GENRE_TYPE: "main",
	GENRE_TYPE_MAIN: "main",
	
	DEFAULT_TITLE_TYPE: "main",
	TITLE_MAIN_TYPE: "main",
	TITLE_SECONDARY_TYPE: "secondary",

// A177v1 only table 15 - deprecated in A177v2
    DVBT_SOURCE_TYPE: DVB_SOURCE_PREFIX + ":dvb-t",
    DVBS_SOURCE_TYPE: DVB_SOURCE_PREFIX + ":dvb-s",
    DVBC_SOURCE_TYPE: DVB_SOURCE_PREFIX + ":dvb-c",
    DVBIPTV_SOURCE_TYPE: DVB_SOURCE_PREFIX + ":dvb-iptv",
    DVBDASH_SOURCE_TYPE: DVB_SOURCE_PREFIX + ":dvb-dash",
    DVBAPPLICATION_SOURCE_TYPE: DVB_SOURCE_PREFIX + ":application",

// A177 5.2.7.2
    CONTENT_TYPE_DASH_MPD: "application/dash+xml",    // MPD of linear service
    CONTENT_TYPE_DVB_PLAYLIST: "application/xml",     // XML Playlist

// A177 6.11.1 - Audio Mix Type
	AUDIO_MIX_MONO: "urn:mpeg:mpeg7:cs:AudioPresentationCS:2001:2",
	AUDIO_MIX_STEREO: "urn:mpeg:mpeg7:cs:AudioPresentationCS:2001:3",
	AUDIO_MIX_5_1: "urn:mpeg:mpeg7:cs:AudioPresentationCS:2001:5",

// A177 6.11.2 - Audio Purpose
	AUDIO_PURPOSE_MAIN: "urn:tva:metadata:cs:AudioPurposeCS:2007:1",
	AUDIO_PURPOSE_DESCRIPTION: "urn:tva:metadata:cs:AudioPurposeCS:2007:6",

// A177 6.11.3 - Caption Coding Format
	DVB_BITMAP_SUBTITLES: "urn:tva:metadata:cs:CaptionCodingFormatCS:2015:2.1",
	DVB_CHARACTER_SUBTITLES: "urn:tva:metadata:cs:CaptionCodingFormatCS:2015:2.2",
	EBU_TT_D: "urn:tva:metadata:cs:CaptionCodingFormatCS:2015:3.2",

// A177 6.11.6 - Media Availability
	MEDIA_AVAILABLE: "urn:fvc:metadata:cs:MediaAvailabilityCS:2014-07:media_available",
	MEDIA_UNAVAILABLE: "urn:fvc:metadata:cs:MediaAvailabilityCS:2014-07:media_unavailable",

// A177 6.11.7 - Forward EPG Availability
	FORWARD_EPG_AVAILABLE: "urn:fvc:metadata:cs:FEPGAvailabilityCS:2014-10:fepg_available",
	FORWARD_EPG_UNAVAILABLE: "urn:fvc:metadata:cs:FEPGAvailabilityCS:2014-10:fepg_unavailable",

//A177r1 6.11.10 - Restart Link
	// RESTART_LINK: "urn:fvc:metadata:cs:RestartAvailabilityCS:2018:restart",
//A177r1 6.5.5 - Restart Link
	RESTART_LINK: "urn:fvc:metadata:cs:HowRelatedCS:2018:restart",

// A177 6.11.11 - Restart Availability
    RESTART_AVAILBLE: "urn:fvc:metadata:cs:RestartAvailabilityCS:2018:restart_available",
	RESTART_CHECK: "urn:fvc:metadata:cs:RestartAvailabilityCS:2018:restart_check",
	RESTART_PENDING: "urn:fvc:metadata:cs:RestartAvailabilityCS:2018:restart_pending",

// A177v1 7.3.1
    BANNER_OUTSIDE_AVAILABILITY_v1: DVB_RELATED_CS_v1+":1000.1",
    LOGO_SERVICE_LIST_v1: DVB_RELATED_CS_v1+":1001.1",
    LOGO_SERVICE_v1: DVB_RELATED_CS_v1+":1001.2",
    LOGO_CG_PROVIDER_v1: DVB_RELATED_CS_v1+":1002.1",

// A177v2 7.3.1
    BANNER_OUTSIDE_AVAILABILITY_v2: DVB_RELATED_CS_v2+":1000.1",
	BANNER_CONTENT_FINISHED_v2: DVB_RELATED_CS_v2+":1000.2",	// added in A177v2
    LOGO_SERVICE_LIST_v2: DVB_RELATED_CS_v2+":1001.1",
    LOGO_SERVICE_v2: DVB_RELATED_CS_v2+":1001.2",
    LOGO_CG_PROVIDER_v2: DVB_RELATED_CS_v2+":1002.1",

// A177 7.3.2
    APP_IN_PARALLEL: LINKED_APLICATION_CS+":1.1",
    APP_IN_CONTROL: LINKED_APLICATION_CS+":1.2",
    APP_OUTSIDE_AVAILABILITY: LINKED_APLICATION_CS+":2",

// possible values for DVB-S polarization
	DVBS_POLARIZATION_VALUES: ["horizontal", "vertical", "left circular", "right circular"],

// A177 defined elements and attributes	
	a_CGSID: "CGSID",
	a_channelNumber: "channelNumber",
	a_contentType: "contentType",
	a_countryCodes: "countryCodes",
	a_dynamic: "dynamic", 
	a_extensionName: "extensionName",
	a_horizontalSize: "horizontalSize",
	a_href: "href",
	a_lang: "lang",
	a_origNetId: "origNetId",
	a_priority: "priority", 
	a_regionID: "regionID",
	a_serviceId: "serviceId",
	a_serviceRef: "serviceRef",
	a_tsId: "tsId",
	a_validFrom: "validFrom",
	a_validTo: "validTo",
	a_version: "version",
	a_verticalSize: "verticalSize",

	e_AudioAttributes: "AudioAttributes",
	e_AudioConformancePoint: "AudioConformancePoint",
	e_Availability: "Availability",
	e_Coding: "Coding",
	e_ContentAttributes: "ContentAttributes",
	e_ContentGuideServiceRef: "ContentGuideSourceRef",
	e_ContentGuideSource: "ContentGuideSource",
	e_ContentGuideSourceList: "ContentGuideSourceList",
	e_ContentGuideSourceRef: "ContentGuideSourceRef",
	e_DASHDeliveryParameters: "DASHDeliveryParameters",
	e_DisplayName: "DisplayName",
	e_DVBCDeliveryParameters: "DVBCDeliveryParameters",
	e_DVBSDeliveryParameters: "DVBSDeliveryParameters",
	e_DVBTDeliveryParameters: "DVBTDeliveryParameters",
	e_DVBTriplet: "DVBTriplet",
	e_Extension: "Extension",
	e_Format: "Format",
	e_Frequency: "Frequency",
	e_HowRelated: "HowRelated",
	e_LCN: "LCN",
	e_LCNTable: "LCNTable",
	e_LCNTableList: "LCNTableList",
	e_MediaLocator: "MediaLocator",
	e_MediaUri: "MediaUri",
	e_MinimumBitRate: "MinimumBitRate",
	e_MulticastTSDeliveryParameters: "MulticastTSDeliveryParameters",
	e_Name: "Name",
	e_NetworkID: "NetworkID", 
	e_OrbitalPosition: "OrbitalPosition",
	e_OtherDeliveryParameters: "OtherDeliveryParameters",
	e_Period: "Period",
	e_Polarization: "Polarization",
	e_ProviderName: "ProviderName",
	e_QueryParameters: "QueryParameters",
	e_RecordingInfo: "RecordingInfo",
	e_Region: "Region",
	e_RegionList: "RegionList",
	e_RelatedMaterial: "RelatedMaterial",
	e_RTSPDeliveryParameters: "RTSPDeliveryParameters",
	e_Service: "Service",
	e_ServiceInstance: "ServiceInstance",
	e_ServiceGenre: "ServiceGenre",
	e_ServiceList: "ServiceList",
	e_ServiceName: "ServiceName",
	e_ServiceType: "ServiceType",
	e_SourceType: "SourceType",
	e_StillPictureFormat: "StillPictureFormat",
	e_TargetCountry: "TargetCountry",
	e_TargetRegion: "TargetRegion",
	e_UniqueIdentifier: "UniqueIdentifier",
	e_URI: "URI",
	e_UriBasedLocation: "UriBasedLocation",
	e_VideoAttributes: "VideoAttributes",
	e_VideoConformancePoint: "VideoConformancePoint",
	
	__zzzDVB_IENDzzz__: null
});
