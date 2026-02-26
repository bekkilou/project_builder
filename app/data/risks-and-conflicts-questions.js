// ============================================================
//  risks-and-conflicts-questions.js
//
//  Visibility flags:
//  alwaysShow:               true  = always shown
//  showWhenCIConflict:       true  = show when CIConflict == "yes"
//  showWhenEthicsCommittee:  true  = show when CIEthicsCommittee == "yes"
//  showWhenPersonalPayment:  true  = show when personalPayment == "yes"
// ============================================================

module.exports = {

  riskToTeam: {
    type: "textarea",
    name: "riskToTeam",
    legendSize: "l",
    label: "Describe potential risks to the research team in conducting the project and state how these will be managed.",
    alwaysShow: true,
    rows: 5
  },

  CIConflict: {
    type: "radios",
    name: "CIConflict",
    inline: true,
    legendSize: "l",
    legend: "Does the Chief Investigator or any other investigator or collaborator have any direct personal involvement (for example, financial, share-holding, personal relationship) in the organisations sponsoring or funding the project that may give rise to a possible conflict of interest?",
    alwaysShow: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  CIConflictDetails: {
    type: "textarea",
    name: "CIConflictDetails",
    legendSize: "l",
    label: "Give details of any potential relevant conflict of interest.",
    hint: "Include details of the individuals and the potential conflict of interest. If the application is also for MoD, include details of who these people are.",
    showWhenCIConflict: true,
    rows: 5
  },

  CIEthicsCommittee: {
    type: "radios",
    name: "CIEthicsCommittee",
    inline: true,
    legendSize: "l",
    legend: "Is the Chief Investigator a member of any NHS Research Ethics Committee?",
    alwaysShow: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  ethicsCommittees: {
    type: "checkboxes",
    name: "ethicsCommittees",
    legendSize: "l",
    legend: "Select one or more Research Ethics Committees",
    hint: "Select all that apply.",
    showWhenEthicsCommittee: true,
    items: [
      { value: "east_midlands_derby",                       text: "East Midlands – Derby" },
      { value: "east_midlands_leicester_central",           text: "East Midlands – Leicester Central" },
      { value: "east_midlands_leicester_south",             text: "East Midlands – Leicester South" },
      { value: "east_midlands_nottingham_1",                text: "East Midlands – Nottingham 1" },
      { value: "east_midlands_nottingham_2",                text: "East Midlands – Nottingham 2" },
      { value: "east_of_england_cambs_and_herts",           text: "East of England – Cambridgeshire and Hertfordshire" },
      { value: "east_of_england_essex",                     text: "East of England – Essex" },
      { value: "east_of_england_cambridge_central",         text: "East of England – Cambridge Central" },
      { value: "east_of_england_cambridge_east",            text: "East of England – Cambridge East" },
      { value: "east_of_england_cambridge_south",           text: "East of England – Cambridge South" },
      { value: "east_of_scotland_rec_1",                    text: "East of Scotland Research Ethics Service REC 1" },
      { value: "east_of_scotland_rec_2",                    text: "East of Scotland Research Ethics Service REC 2" },
      { value: "hsc_rec_a",                                 text: "Health and Social Care Research Ethics Committee A (HSC REC A)" },
      { value: "hsc_rec_b",                                 text: "Health and Social Care Research Ethics Committee B (HSC REC B)" },
      { value: "london_bloomsbury",                         text: "London – Bloomsbury" },
      { value: "london_camden_and_kings_cross",             text: "London – Camden and Kings Cross" },
      { value: "london_central",                            text: "London – Central" },
      { value: "london_brent",                              text: "London – Brent" },
      { value: "london_brighton_and_sussex",                text: "London – Brighton and Sussex" },
      { value: "london_bromley",                            text: "London – Bromley" },
      { value: "london_camberwell_st_giles",                text: "London – Camberwell St Giles" },
      { value: "london_chelsea",                            text: "London – Chelsea" },
      { value: "london_city_and_east",                      text: "London – City and East" },
      { value: "london_dulwich",                            text: "London – Dulwich" },
      { value: "london_fulham",                             text: "London – Fulham" },
      { value: "london_hampstead",                          text: "London – Hampstead" },
      { value: "london_harrow",                             text: "London – Harrow" },
      { value: "london_london_bridge",                      text: "London – London Bridge" },
      { value: "london_queen_square",                       text: "London – Queen Square" },
      { value: "london_riverside",                          text: "London – Riverside" },
      { value: "london_south_east",                         text: "London – South East" },
      { value: "london_stanmore",                           text: "London – Stanmore" },
      { value: "london_surrey",                             text: "London – Surrey" },
      { value: "london_surrey_borders",                     text: "London – Surrey Borders" },
      { value: "london_west_london_and_gtac",               text: "London – West London & GTAC" },
      { value: "london_westminster",                        text: "London – Westminster" },
      { value: "social_care_rec",                           text: "Social Care Research Ethics Committee" },
      { value: "north_east_newcastle_1",                    text: "North East – Newcastle and North Tyneside 1" },
      { value: "north_east_newcastle_2",                    text: "North East – Newcastle and North Tyneside 2" },
      { value: "north_east_tyne_and_wear_south",            text: "North East – Tyne & Wear South" },
      { value: "north_east_york",                           text: "North East – York" },
      { value: "north_of_scotland_rec_1",                   text: "North of Scotland Research Ethics Committee 1" },
      { value: "north_of_scotland_rec_2",                   text: "North of Scotland Research Ethics Committee 2" },
      { value: "north_west_gm_central",                     text: "North West – Greater Manchester (GM) Central" },
      { value: "north_west_gm_east",                        text: "North West – Greater Manchester (GM) East" },
      { value: "north_west_gm_south",                       text: "North West – Greater Manchester (GM) South" },
      { value: "north_west_gm_west",                        text: "North West – Greater Manchester (GM) West" },
      { value: "north_west_haydock",                        text: "North West – Haydock" },
      { value: "north_west_liverpool_central",              text: "North West – Liverpool Central" },
      { value: "north_west_liverpool_east",                 text: "North West – Liverpool East" },
      { value: "north_west_preston",                        text: "North West – Preston" },
      { value: "scotland_a_rec",                            text: "Scotland A Research Ethics Committee" },
      { value: "south_central_berkshire_b",                 text: "South Central – Berkshire B" },
      { value: "south_central_hampshire_a",                 text: "South Central – Hampshire A" },
      { value: "south_central_hampshire_b",                 text: "South Central – Hampshire B" },
      { value: "south_central_berkshire",                   text: "South Central – Berkshire" },
      { value: "south_central_oxford_a",                    text: "South Central – Oxford A" },
      { value: "south_central_oxford_b",                    text: "South Central – Oxford B" },
      { value: "south_central_oxford_c",                    text: "South Central – Oxford C" },
      { value: "south_east_scotland_rec_1",                 text: "South East Scotland Research Ethics Committee 1" },
      { value: "south_east_scotland_rec_2",                 text: "South East Scotland Research Ethics Committee 2" },
      { value: "south_west_central_bristol",                text: "South West – Central Bristol" },
      { value: "south_west_cornwall_and_plymouth",          text: "South West – Cornwall and Plymouth" },
      { value: "south_west_exeter",                         text: "South West – Exeter" },
      { value: "south_west_frenchay",                       text: "South West – Frenchay" },
      { value: "wales_rec_1",                               text: "Wales REC 1" },
      { value: "wales_rec_2",                               text: "Wales REC 2" },
      { value: "wales_rec_3",                               text: "Wales REC 3" },
      { value: "wales_rec_4",                               text: "Wales REC 4" },
      { value: "wales_rec_5",                               text: "Wales REC 5" },
      { value: "wales_rec_6",                               text: "Wales REC 6" },
      { value: "wales_rec_7",                               text: "Wales REC 7" },
      { value: "west_midlands_edgbaston",                   text: "West Midlands – Edgbaston" },
      { value: "west_midlands_coventry_and_warwickshire",   text: "West Midlands – Coventry and Warwickshire" },
      { value: "west_midlands_solihull",                    text: "West Midlands – Solihull" },
      { value: "west_midlands_south_birmingham",            text: "West Midlands – South Birmingham" },
      { value: "west_midlands_the_black_country",           text: "West Midlands – The Black Country" },
      { value: "west_of_scotland_rec_1",                    text: "West of Scotland REC 1" },
      { value: "west_of_scotland_rec_3",                    text: "West of Scotland REC 3" },
      { value: "west_of_scotland_rec_4",                    text: "West of Scotland REC 4" },
      { value: "west_of_scotland_rec_5",                    text: "West of Scotland REC 5" },
      { value: "yorkshire_bradford_leeds",                  text: "Yorkshire and the Humber – Bradford Leeds" },
      { value: "yorkshire_leeds_east",                      text: "Yorkshire and the Humber – Leeds East" },
      { value: "yorkshire_leeds_west",                      text: "Yorkshire and the Humber – Leeds West" },
      { value: "yorkshire_sheffield",                       text: "Yorkshire and the Humber – Sheffield" },
      { value: "yorkshire_south_yorkshire",                 text: "Yorkshire and the Humber – South Yorkshire" }
    ]
  },

  personalPayment: {
    type: "radios",
    name: "personalPayment",
    inline: true,
    legendSize: "l",
    legend: "Will the Chief Investigator or any other investigator receive any personal payment over and above normal salary, or any other benefits or incentives, for taking part in this project?",
    alwaysShow: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  personalPaymentYes: {
    type: "textarea",
    name: "personalPaymentYes",
    legendSize: "l",
    label: "Give details of payments, benefits or any other incentives.",
    showWhenPersonalPayment: true,
    rows: 5
  }

}
