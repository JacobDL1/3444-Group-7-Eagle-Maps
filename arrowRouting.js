/*
Logic for arrow routing, uses map colors to discern what that color indicates the region is for
*/

const coordinates =
{
  'discoveryPark':
  {
    wings:
    {
      'A_WING': { x: 977, y: 1657, floor: 1 },
      'B_WING_FIRSTFLOOR': { x: 1203, y: 1238, floor: 1 },
      'D_WING_FIRSTFLOOR': { x: 1040, y: 1076, floor: 1 },
      'E_WING_FIRSTFLOOR': { x: 450, y: 1092, floor: 1 },
      'F_WING_FIRSTFLOOR': { x: 1413, y: 1570, floor: 1 },
      'G_WING': { x: 694, y: 1089, floor: 1 },
      'K_WING_FIRSTFLOOR': { x: 241, y: 1082, floor: 1 },
      'M_WING': { x: 1491, y: 1542, floor: 1 },
      'J_WING': { x: 1122, y: 905, floor: 1 },
      'B_WING_SECONDFLOOR': { x: 1564, y: 669, floor: 2 },
      'D_WING_SECONDFLOOR': { x: 1550, y: 371, floor: 2 },
      'E_WING_SECONDFLOOR': { x: 778, y: 386, floor: 2 },
      'F_WING_SECONDFLOOR': { x: 1845, y: 977, floor: 2 },
      'K_WING_SECONDFLOOR': { x: 399, y: 376, floor: 2 }
    },
    stairs:
    [
      { floor1 : {x: 1237, y: 1096}, floor2: {x: 1602, y: 419} },
      { floor1 : {x: 834, y: 1063}, floor2: {x: 1100, y: 353} },
      { floor1 : {x: 209, y: 1085}, floor2: {x: 359, y: 364} },
      { floor1 : {x: 1111, y: 1549}, floor2: {x: 1372, y: 940} },
      { floor1 : { x: 1692, y: 1553}, floor2: {x: 2145, y: 943} },
    ]
  }
};
const roomCoordinates =
{
    'discoveryPark':
    {
      A_wingFirstFloor_roomCoords:
      {
        'A101': { x: 974, y: 1788, floor: 1 },
        'A130': { x: 951, y: 1808, floor: 1 },
        'A131': { x: 950, y: 1808, floor: 1 },
        'A140': { x: 953, y: 1754, floor: 1 },
        'A160A': { x: 952, y: 1640, floor: 1 },
        'A160B': { x: 902, y: 1655, floor: 1 },
        'A160C': { x: 883, y: 1656, floor: 1 },
        'A160D': { x: 863, y: 1656, floor: 1 },
        'A160E': { x: 837, y: 1665, floor: 1 },
        'A160F': { x: 878, y: 1659, floor: 1 },
        'A160G': { x: 894, y: 1660, floor: 1 },
        'A143': { x: 861, y: 1745, floor: 1 },
        'A144': { x: 862, y: 1726, floor: 1 },
        'A145': { x: 861, y: 1706, floor: 1 },
        'A146': { x: 861, y: 1706, floor: 1 },
        'A147': { x: 887, y: 1705, floor: 1 },
        'A149': { x: 871, y: 1720, floor: 1 },
        'A151': { x: 923, y: 1723, floor: 1 },
        'A154': { x: 923, y: 1724, floor: 1 },
        'A150': { x: 922, y: 1691, floor: 1 },
        'A153': { x: 923, y: 1693, floor: 1 }
      },

      B_wingFirstFloor_roomCoords:
      {
        'B185': { x: 923, y: 1462, floor: 1 },
        'B185A': { x: 948, y: 1397, floor: 1 },
        'B185B': { x: 998, y: 1397, floor: 1 },
        'B156': { x: 1031, y: 1378, floor: 1 },
        'B145': { x: 1034, y: 1388, floor: 1 },
        'B186A': { x: 925, y: 1521, floor: 1 },
        'B186B': { x: 966, y: 1564, floor: 1 },
        'B187': { x: 1052, y: 1530, floor: 1 },
        'B192': { x: 1166, y: 1505, floor: 1 },
        'B190': { x: 1166, y: 1441, floor: 1 },
        'B157': { x: 924, y: 1291, floor: 1 },
        'B158': { x: 924, y: 1360, floor: 1 },
        'B155': { x: 1007, y: 1246, floor: 1 },
        'B142': { x: 1067, y: 1248, floor: 1 },
        'B140': { x: 1123, y: 1249, floor: 1 },
        'B112': { x: 987, y: 1099, floor: 1 },
        'B110': { x: 924, y: 1187, floor: 1 },
        'B111': { x: 925, y: 1220, floor: 1 },
        'B131': { x: 1165, y: 1216, floor: 1 },
        'B131A': { x: 1112, y: 1245, floor: 1 },
        'B131B': { x: 1112, y: 1244, floor: 1 },
        'B129': { x: 1163, y: 1168, floor: 1 },
        'B129A': { x: 1108, y: 1095, floor: 1 },
        'B129B': { x: 1131, y: 1093, floor: 1 },
        'B129C': { x: 1152, y: 1097, floor: 1 }
      },

      D_wingFirstFloor_roomCoords:
      {
        'D115': { x: 952, y: 1052, floor: 1 },
        'D133': { x: 942, y: 915, floor: 1 },
        'D132': { x: 1023, y: 912, floor: 1 },
        'D130': { x: 1055, y: 911, floor: 1 },
        'D120': { x: 1165, y: 936, floor: 1 },
        'D126': { x: 1167, y: 982, floor: 1 },
        'D111': { x: 1167, y: 1013, floor: 1 },
        'D110': { x: 1165, y: 1036, floor: 1 },
        'D112': { x: 1098, y: 1052, floor: 1 },
        'D113': { x: 1053, y: 1054, floor: 1 },
        'D114': { x: 1025, y: 1051, floor: 1 },
        'D155': { x: 1003, y: 901, floor: 1 },
        'D144': { x: 1072, y: 898, floor: 1 },
        'D142': { x: 1142, y: 896, floor: 1 },
        'D140': { x: 1207, y: 899, floor: 1 },
        'D190': { x: 1215, y: 913, floor: 1 }
        
      },

      E_wingFirstFloor_roomCoords:
      {
        'E103': { x: 317, y: 1101, floor: 1 },
        'E111': { x: 451, y: 1101, floor: 1 },
        'E110': { x: 431, y: 1101, floor: 1 },
        'E108': { x: 409, y: 1101, floor: 1 },
        'E106': { x: 383, y: 1101, floor: 1 },
        'E104': { x: 361, y: 1100, floor: 1 },
        'E102': { x: 340, y: 1101, floor: 1 },
        'E124': { x: 670, y: 1101, floor: 1 },
        'E123': { x: 648, y: 1100, floor: 1 },
        'E121': { x: 627, y: 1102, floor: 1 },
        'E120': { x: 605, y: 1099, floor: 1 },
        'E119': { x: 581, y: 1100, floor: 1 },
        'E118': { x: 559, y: 1100, floor: 1 },
        'E117': { x: 536, y: 1101, floor: 1 },
        'E132': { x: 321, y: 1153, floor: 1 },
        'E132A': { x: 363, y: 1152, floor: 1 },
        'E132B': { x: 407, y: 1153, floor: 1 },
        'E132H': { x: 309, y: 1198, floor: 1 },
        'E132G': { x: 330, y: 1198, floor: 1 },
        'E132F': { x: 352, y: 1198, floor: 1 },
        'E132E': { x: 379, y: 1198, floor: 1 },
        'E132D': { x: 399, y: 1198, floor: 1 },
        'E132C': { x: 425, y: 1198, floor: 1 },
        'E138A': { x: 449, y: 1152, floor: 1 },
        'E138': { x: 451, y: 1266, floor: 1 },
        'E136': { x: 373, y: 1267, floor: 1 },
        'E141': { x: 488, y: 1266, floor: 1 },
        'E140': { x: 486, y: 1155, floor: 1 },
        'E142': { x: 532, y: 1153, floor: 1 },
        'E142A': { x: 522, y: 1266, floor: 1 },
        'E142B': { x: 548, y: 1267, floor: 1 },
        'E144': { x: 574, y: 1153, floor: 1 },
        'E146': { x: 619, y: 1154, floor: 1 },
        'E148': { x: 662, y: 1155, floor: 1 },
        'E147': { x: 616, y: 1267, floor: 1 },
        'E149': { x: 662, y: 1265, floor: 1 },
        'E128': { x: 702, y: 1184, floor: 1 },
        'E129': { x: 700, y: 1272, floor: 1 },
        'E150': { x: 663, y: 1339, floor: 1 },
        'E151': { x: 691, y: 1369, floor: 1 },
        'E145': { x: 628, y: 1339, floor: 1 },
        'E143': { x: 589, y: 1338, floor: 1 },
        'E139': { x: 539, y: 1338, floor: 1 },
        'E154': { x: 504, y: 1362, floor: 1 },
        'E155': { x: 506, y: 1419, floor: 1 },
        'E137': { x: 450, y: 1338, floor: 1 },
        'E135': { x: 356, y: 1337, floor: 1 },
        'E199C': { x: 702, y: 1388, floor: 1 },
        'E199B': { x: 703, y: 1440, floor: 1 },
        'E152': { x: 690, y: 1410, floor: 1 },
        'E156': { x: 453, y: 1451, floor: 1 },
        'E157': { x: 496, y: 1386, floor: 1 },
        'E167': { x: 382, y: 1454, floor: 1 },
        'E166': { x: 320, y: 1453, floor: 1 },
        'E163': { x: 293, y: 1399, floor: 1 },
        'E160': { x: 291, y: 1363, floor: 1 },
        'E164': { x: 353, y: 1407, floor: 1 },
        'E165': { x: 353, y: 1407, floor: 1 },
        'E161': { x: 352, y: 1366, floor: 1 },
        'E162': { x: 393, y: 1343, floor: 1 },
        'E168': { x: 288, y: 1387, floor: 1 },
        'E169': { x: 288, y: 1441, floor: 1 },
        'E100F': { x: 369, y: 1466, floor: 1 },
        'E179': { x: 290, y: 1500, floor: 1 },
        'E186': { x: 286, y: 1600, floor: 1 },
        'E180E': { x: 317, y: 1575, floor: 1 },
        'E180C': { x: 316, y: 1583, floor: 1 },
        'E180G': { x: 351, y: 1575, floor: 1 },
        'E180B': { x: 348, y: 1584, floor: 1 },
        'E180J': { x: 386, y: 1575, floor: 1 },
        'E180Z': { x: 380, y: 1583, floor: 1 },
        'E180L': { x: 420, y: 1575, floor: 1 },
        'E180X': { x: 410, y: 1584, floor: 1 },
        'E180N': { x: 450, y: 1576, floor: 1 },
        'E180V': { x: 450, y: 1584, floor: 1 },
        'E180C': { x: 318, y: 1637, floor: 1 },
        'E180A': { x: 352, y: 1637, floor: 1 },
        'E180P': { x: 470, y: 1540, floor: 1 },
        'E178Q': { x: 512, y: 1477, floor: 1 },
        'E178R': { x: 510, y: 1514, floor: 1 },
        'E178E': { x: 557, y: 1467, floor: 1 },
        'E178C': { x: 519, y: 1575, floor: 1 },
        'E178D': { x: 517, y: 1527, floor: 1 },
        'E178B': { x: 519, y: 1625, floor: 1 },
        'E180U': { x: 508, y: 1625, floor: 1 },
        'E180T': { x: 510, y: 1602, floor: 1 },
        'E180S': { x: 509, y: 1582, floor: 1 },
        'E180R': { x: 508, y: 1561, floor: 1 },
        'E180Q': { x: 509, y: 1533, floor: 1 },
        'E178': { x: 574, y: 1637, floor: 1 },
        'E178P': { x: 612, y: 1636, floor: 1 },
        'E178N': { x: 650, y: 1636, floor: 1 },
        'E178M': { x: 693, y: 1626, floor: 1 },
        'E178L': { x: 684, y: 1602, floor: 1 },
        'E178K': { x: 693, y: 1566, floor: 1 },
        'E175': { x: 691, y: 1513, floor: 1 },
        'E199A': { x: 702, y: 1587, floor: 1 },
        'E170': { x: 679, y: 1461, floor: 1 },
        'E171': { x: 662, y: 1463, floor: 1 },
        'E172': { x: 651, y: 1463, floor: 1 },
        'E173': { x: 641, y: 1462, floor: 1 },
        'E178G': { x: 586, y: 1464, floor: 1 },
        'E178H': { x: 557, y: 1467, floor: 1 },
        'E178J': { x: 557, y: 1467, floor: 1 },
        'E133': { x: 290, y: 1183, floor: 1 },
        'E134': { x: 289, y: 1271, floor: 1 }
      },

      K_wingFirstFloor_roomCoords:
      {
        'K100': { x: 268, y: 1102, floor: 1 },
        'K101': { x: 241, y: 1128, floor: 1 },
        'K102': { x: 241, y: 1151, floor: 1 },
        'K103': { x: 224, y: 1162, floor: 1 },
        'K104': { x: 209, y: 1101, floor: 1 },
        'K110': { x: 177, y: 1102, floor: 1 },
        'K120': { x: 107, y: 1099, floor: 1 },
        'K129': { x: 68, y: 1080, floor: 1 },
        'K140': { x: 107, y: 1079, floor: 1 },
        'K130': { x: 143, y: 1084, floor: 1 },
        'K145': { x: 116, y: 1003, floor: 1 },
        'K160A': { x: 117, y: 1004, floor: 1 },
        'K160B': { x: 117, y: 1004, floor: 1 },
        'K107': { x: 208, y: 1008, floor: 1 },
        'K150': { x: 133, y: 976, floor: 1 },
        'K160': { x: 117, y: 983, floor: 1 },
        'K170': { x: 115, y: 930, floor: 1 },
        'K160C': { x: 115, y: 930, floor: 1 },
        'K175': { x: 116, y: 910, floor: 1 },
        'K180': { x: 267, y: 1052, floor: 1 }
      },

      M_wingFirstFloor_roomCoords:
      {
        'M101': { x: 1241, y: 1419, floor: 1 },
        'M103': { x: 1333, y: 1536, floor: 1 },
        'M102': { x: 1333, y: 1537, floor: 1 },
        'M130': { x: 1417, y: 1536, floor: 1 },
        'M151': { x: 1523, y: 1536, floor: 1 },
        'M152': { x: 1477, y: 1536, floor: 1 },
        'M153': { x: 1476, y: 1535, floor: 1 },
        'M153A': { x: 1477, y: 1536, floor: 1 },
        'M154': { x: 1477, y: 1536, floor: 1 },
        'M155': { x: 1477, y: 1536, floor: 1 },
        'M156': { x: 1475, y: 1538, floor: 1 },
        'M170': { x: 1475, y: 1538, floor: 1 }
      },

      F_wingFirstFloor_roomCoords:
      {
        'F101': { x: 1228, y: 1586, floor: 1 },
        'F115N': { x: 1588, y: 1585, floor: 1 },
        'F115N': { x: 1566, y: 1586, floor: 1 },
        'F115L': { x: 1541, y: 1584, floor: 1 },
        'F115K': { x: 1521, y: 1586, floor: 1 },
        'F115': { x: 1468, y: 1585, floor: 1 },
        'F101M': { x: 1360, y: 1583, floor: 1 },
        'F101K': { x: 1338, y: 1584, floor: 1 },
        'F101H': { x: 1312, y: 1585, floor: 1 },
        'F101F': { x: 1286, y: 1585, floor: 1 },
        'F101C': { x: 1263, y: 1584, floor: 1 },
        'F101A': { x: 1199, y: 1640, floor: 1 },
        'F101L': { x: 1348, y: 1622, floor: 1 },
        'F101J': { x: 1326, y: 1622, floor: 1 },
        'F101G': { x: 1305, y: 1620, floor: 1 },
        'F101E': { x: 1281, y: 1620, floor: 1 },
        'F101B': { x: 1261, y: 1620, floor: 1 },
        'F116': { x: 1367, y: 1635, floor: 1 },
        'F118': { x: 1368, y: 1664, floor: 1 },
        'F119': { x: 1368, y: 1695, floor: 1 },
        'F101N': { x: 1363, y: 1663, floor: 1 },
        'F101P': { x: 1363, y: 1684, floor: 1 },
        'F101Q': { x: 1363, y: 1706, floor: 1 },
        'F102A': { x: 1304, y: 1720, floor: 1 },
        'F102D': { x: 1233, y: 1719, floor: 1 },
        'F102': { x: 1194, y: 1667, floor: 1 },
        'F104': { x: 1193, y: 1750, floor: 1 },
        'F102F': { x: 1270, y: 1727, floor: 1 },
        'F102G': { x: 1243, y: 1727, floor: 1 },
        'F102H': { x: 1219, y: 1725, floor: 1 },
        'F102J': { x: 1201, y: 1761, floor: 1 },
        'F102K': { x: 1238, y: 1778, floor: 1 },
        'F102E': { x: 1238, y: 1779, floor: 1 },
        'F102L': { x: 1199, y: 1794, floor: 1 },
        'F102T': { x: 1374, y: 1787, floor: 1 },
        'F102S': { x: 1374, y: 1766, floor: 1 },
        'F102R': { x: 1376, y: 1743, floor: 1 },
        'F102C': { x: 1314, y: 1726, floor: 1 },
        'F102B': { x: 1337, y: 1726, floor: 1 },
        'F122': { x: 1610, y: 1667, floor: 1 },
        'F123': { x: 1607, y: 1748, floor: 1 },
        'F125': { x: 1599, y: 1767, floor: 1 },
        'F126': { x: 1544, y: 1820, floor: 1 },
        'F130': { x: 1402, y: 1728, floor: 1 },
        'F129': { x: 1428, y: 1726, floor: 1 },
        'F128': { x: 1455, y: 1727, floor: 1 },
        'F127': { x: 1480, y: 1725, floor: 1 },
        'F126C': { x: 1509, y: 1819, floor: 1 },
        'F126A': { x: 1509, y: 1726, floor: 1 },
        'F138': { x: 1480, y: 1820, floor: 1 },
        'F140': { x: 1454, y: 1819, floor: 1 },
        'F142': { x: 1431, y: 1823, floor: 1 },
        'F144': { x: 1404, y: 1820, floor: 1 },
        'F115B': { x: 1439, y: 1640, floor: 1 },
        'F115C': { x: 1440, y: 1667, floor: 1 },
        'F115D': { x: 1439, y: 1684, floor: 1 },
        'F115E': { x: 1439, y: 1703, floor: 1 },
        'F115S': { x: 1585, y: 1719, floor: 1 },
        'F115U': { x: 1568, y: 1718, floor: 1 },
        'F115W': { x: 1548, y: 1719, floor: 1 },
        'F115X': { x: 1529, y: 1719, floor: 1 },
        'F115Q': { x: 1600, y: 1641, floor: 1 },
        'F115P': { x: 1551, y: 1621, floor: 1 },
        'F115I': { x: 1510, y: 1655, floor: 1 },
        'F115V': { x: 1548, y: 1683, floor: 1 },
        'F115T': { x: 1566, y: 1682, floor: 1 },
        'F115R': { x: 1588, y: 1682, floor: 1 },
        'F152': { x: 1197, y: 1880, floor: 1 },
        'F153': { x: 1198, y: 1880, floor: 1 },
        'F154': { x: 1199, y: 1881, floor: 1 },
        'F154A': { x: 1209, y: 1921, floor: 1 },
        'F155': { x: 1199, y: 1946, floor: 1 },
        'F156': { x: 1200, y: 1977, floor: 1 },
        'F157A': { x: 1230, y: 1963, floor: 1 },
        'F157': { x: 1201, y: 2011, floor: 1 },
        'F160': { x: 1202, y: 2011, floor: 1 },
        'F165': { x: 1197, y: 2069, floor: 1 },
        'F158': { x: 1198, y: 2071, floor: 1 },
        'F143': { x: 1403, y: 1825, floor: 1 },
        'F141': { x: 1425, y: 1826, floor: 1 },
        'F139': { x: 1449, y: 1825, floor: 1 },
        'F179': { x: 1426, y: 1936, floor: 1 },
        'F178': { x: 1472, y: 1939, floor: 1 },
        'F175': { x: 1523, y: 1937, floor: 1 },
        'F173': { x: 1577, y: 1938, floor: 1 },
        'F132': { x: 1601, y: 1848, floor: 1 },
        'F177': { x: 1474, y: 1826, floor: 1 },
        'F162': { x: 1378, y: 1921, floor: 1 },
        'F163': { x: 1376, y: 1969, floor: 1 },
        'F160A': { x: 1377, y: 1844, floor: 1 },
        'F160': { x: 1377, y: 1845, floor: 1 },
        'F183': { x: 1387, y: 1985, floor: 1 },
        'F185': { x: 1384, y: 2029, floor: 1 },
        'F187': { x: 1384, y: 2091, floor: 1 },
        'F182': { x: 1524, y: 2097, floor: 1 },
        'F181': { x: 1523, y: 2045, floor: 1 },
        'F180': { x: 1521, y: 1973, floor: 1 },
        'F181A': { x: 1601, y: 2023, floor: 1 },
        'F198': { x: 1610, y: 2091, floor: 1 },
        'F190B': { x: 1456, y: 2130, floor: 1 },
        'F190A': { x: 1373, y: 2130, floor: 1 }
      },

      G_wingFirstFloor_roomCoords:
      {
        'G136': { x: 582, y: 1050, floor: 1 },
        'G152': { x: 663, y: 1083, floor: 1 },
        'G152A': { x: 628, y: 1053, floor: 1 },
        'G150A': { x: 729, y: 1081, floor: 1 },
        'G193D': { x: 680, y: 795, floor: 1 },
        'G193': { x: 671, y: 793, floor: 1 },
        'G193A': { x: 677, y: 797, floor: 1 },
        'G193B': { x: 678, y: 798, floor: 1 },
        'G193C': { x: 676, y: 796, floor: 1 },
        'G195': { x: 611, y: 795, floor: 1 },
        'G195A': { x: 611, y: 796, floor: 1 },
        'G195B': { x: 612, y: 796, floor: 1 },
        'G195C': { x: 613, y: 795, floor: 1 },
        'G195D': { x: 613, y: 796, floor: 1 },
        'G191': { x: 674, y: 815, floor: 1 },
        'G189': { x: 676, y: 839, floor: 1 },
        'G187': { x: 675, y: 860, floor: 1 },
        'G183': { x: 675, y: 882, floor: 1 },
        'G181': { x: 674, y: 902, floor: 1 },
        'G186': { x: 664, y: 833, floor: 1 },
        'G178': { x: 695, y: 950, floor: 1 },
        'G178A': { x: 682, y: 929, floor: 1 },
        'G178B': { x: 682, y: 929, floor: 1 },
        'G178C': { x: 682, y: 929, floor: 1 },
        'G178D': { x: 683, y: 927, floor: 1 },
        'G172': { x: 713, y: 978, floor: 1 },
        'G172A': { x: 713, y: 978, floor: 1 },
        'G172B': { x: 713, y: 977, floor: 1 },
        'G172D': { x: 712, y: 978, floor: 1 },
        'G150C': { x: 730, y: 1009, floor: 1 },
        'G170': { x: 729, y: 1017, floor: 1 },
        'G150B': { x: 707, y: 1026, floor: 1 },
        'G184': { x: 645, y: 866, floor: 1 },
        'G182': { x: 661, y: 895, floor: 1 },
        'G180': { x: 670, y: 914, floor: 1 },
        'G175': { x: 688, y: 946, floor: 1 },
        'G173': { x: 701, y: 968, floor: 1 },
        'G171': { x: 715, y: 992, floor: 1 },
        'G163': { x: 606, y: 875, floor: 1 },
        'G162': { x: 607, y: 914, floor: 1 },
        'G161': { x: 615, y: 923, floor: 1 },
        'G159': { x: 629, y: 946, floor: 1 },
        'G158': { x: 631, y: 956, floor: 1 },
        'G157': { x: 644, y: 974, floor: 1 },
        'G155': { x: 656, y: 992, floor: 1 },
        'G153': { x: 671, y: 1019, floor: 1 },
        'G154': { x: 649, y: 989, floor: 1 },
        'G140': { x: 785, y: 1047, floor: 1 },
        'G140A': { x: 830, y: 1033, floor: 1 },
        'G131A': { x: 837, y: 1014, floor: 1 },
        'G131': { x: 837, y: 998, floor: 1 },
        'G130': { x: 893, y: 965, floor: 1 },
        'G112': { x: 894, y: 875, floor: 1 },
        'G110': { x: 891, y: 920, floor: 1 },
        'G116': { x: 893, y: 808, floor: 1 },
        'G122': { x: 893, y: 772, floor: 1 },
        'G121': { x: 895, y: 744, floor: 1 },
        'G120': { x: 893, y: 718, floor: 1 }
      },
        
      J_wingFirstFloor_roomCoords:
      {
        'J101': { x: 1189, y: 897, floor: 1 },
        'J130': { x: 1189, y: 897, floor: 1 },
        'J105': { x: 1189, y: 897, floor: 1 },
        'J115': { x: 1201, y: 894, floor: 1 }
      },

      B_wingSecondFloor_roomCoords:
      {
        'B205': { x: 1467, y: 401, floor: 2 },
        'B204': { x: 1408, y: 401, floor: 2 },
        'B203': { x: 1382, y: 400, floor: 2 },
        'B201': { x: 1333, y: 400, floor: 2 },
        'B201C': { x: 1290, y: 402, floor: 2 },
        'B201E': { x: 1255, y: 401, floor: 2 },
        'B201D': { x: 1235, y: 439, floor: 2 },
        'B201A': { x: 1332, y: 400, floor: 2 },
        'B201B': { x: 1299, y: 400, floor: 2 },
        'B227': { x: 1229, y: 490, floor: 2 },
        'B205A': { x: 1452, y: 401, floor: 2 },
        'B205B': { x: 1477, y: 400, floor: 2 },
        'B205C': { x: 1499, y: 400, floor: 2 },
        'B206': { x: 1491, y: 571, floor: 2 },
        'B207': { x: 1431, y: 569, floor: 2 },
        'B220': { x: 1328, y: 570, floor: 2 },
        'B217': { x: 1355, y: 569, floor: 2 },
        'B280': { x: 1554, y: 610, floor: 2 },
        'B281': { x: 1556, y: 667, floor: 2 },
        'B282': { x: 1560, y: 718, floor: 2 },
        'B270': { x: 1519, y: 760, floor: 2 },
        'B265': { x: 1500, y: 724, floor: 2 },
        'B263': { x: 1499, y: 681, floor: 2 },
        'B262': { x: 1496, y: 641, floor: 2 },
        'B261': { x: 1500, y: 622, floor: 2 },
        'B260': { x: 1499, y: 592, floor: 2 },
        'B208': { x: 1449, y: 577, floor: 2 },
        'B209': { x: 1423, y: 573, floor: 2 },
        'B210': { x: 1395, y: 574, floor: 2 },
        'B216': { x: 1341, y: 576, floor: 2 },
        'B224': { x: 1304, y: 574, floor: 2 },
        'B225': { x: 1286, y: 573, floor: 2 },
        'B230': { x: 1251, y: 574, floor: 2 },
        'B231': { x: 1228, y: 621, floor: 2 },
        'B232': { x: 1231, y: 650, floor: 2 },
        'B233': { x: 1229, y: 678, floor: 2 },
        'B234': { x: 1230, y: 705, floor: 2 },
        'B235': { x: 1230, y: 731, floor: 2 },
        'B252': { x: 1448, y: 750, floor: 2 },
        'B251': { x: 1421, y: 752, floor: 2 },
        'B250': { x: 1388, y: 749, floor: 2 },
        'B245': { x: 1340, y: 750, floor: 2 },
        'B240': { x: 1280, y: 752, floor: 2 },
        'B271': { x: 1463, y: 759, floor: 2 },
        'B273': { x: 1462, y: 758, floor: 2 },
        'B275': { x: 1462, y: 758, floor: 2 },
        'B277': { x: 1462, y: 758, floor: 2 },
        'B279': { x: 1462, y: 758, floor: 2 },
        'B272': { x: 1462, y: 758, floor: 2 },
        'B274': { x: 1462, y: 758, floor: 2 },
        'B276': { x: 1462, y: 758, floor: 2 },
        'B285': { x: 1382, y: 758, floor: 2 },
        'B242': { x: 1325, y: 758, floor: 2 },
        'B236': { x: 1254, y: 757, floor: 2 },
        'B238': { x: 1224, y: 832, floor: 2 },
        'B239': { x: 1227, y: 867, floor: 2 },
        'B286': { x: 1226, y: 908, floor: 2 },
        'B255': { x: 1224, y: 504, floor: 2 }
      },

      D_wingSecondFloor_roomCoords:
      {
        
      },

      E_wingSecondFloor_roomCoords:
      {
        
      },

      F_wingSecondFloor_roomCoords:
      {
        
      },

      K_wingSecondFloor_roomCoords:
      {
        
      }
    }
};

const naturalWidth = {floor1: 1728, floor2: 2304}; //store width of each Discovery Park image


function scaleImg(x, y, floor, canvas) //upscales or downsacles image to match device's resolution width
{
  const scale = canvas.width / naturalWidth['floor' + floor];
  return { x: Math.round(x * scale), y: Math.round(y * scale) };
}


function getRoomCoords(building, roomNum) //checks if room exists and returns its coordiantes if it does
{
  const wing = roomNum[0].toUpperCase() + '_wing_roomCoords'; //stores name of wing as it will be stored in roomCoordinates
  const room = roomCoordinates[building]; //stores data of rooms in specified building

  if (!room[wing]) //wing does not exist
  {
    return null;
  }

  if (!room[wing][roomNum.toUpperCase()]) //room does not exist
  {
    return null;
  }

  if (room[wing][roomNum.toUpperCase()]) //room exists
  {
    return room[wing][roomNum.toUpperCase()];
  }
}


function hallway(r, g, b) //hallways are grey, should have 211 values accross the board
{
  return Math.abs(r - 211) < 5 && Math.abs(g - 211) < 5 && Math.abs(b - 211) < 5;
}


function wall(r, g, b) //range from (224, 238, 238) to (169, 202, 201) to (114, 177, 176) to (180, 197, 197)
{
  return g > 170 && b > 170 && (g - r) > 30 && Math.abs(g - b) < 30;
}


function room(r, g, b) //rooms are white
{
  return Math.abs(r - 255) < 5 && Math.abs(g - 255) < 5 && Math.abs(b - 255) < 5;
}


function roomNumber(r, g, b) //room numbers are black, but pixelation makes them slgihtly grey sometimes
{
  return r < 80 && g < 80 && b < 80;
}


function walkable(r, g, b) //an area is walkable if its a hallway
{
  return hallway(r, g, b)
}


function logicalGrid(canvas, img) //returns a grid that contains True/False entries reflecting the walkablility of each pixel
{
  const dim = canvas.getContext('2d');
  dim.drawImage(img, 0, 0, canvas.width, canvas.height); //draws map image on the canvas so the map's pixel colors can be read

  const mapData = dim.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = mapData.data; //stores image data as an array where each entry is a (r, g, b, a) value

  const grid = []; //stores whether a pixel is walkable or not

  for (let i = 0; i < canvas.height; i++)
    {
      grid[i] = []; //initialize grid spot
      
      for (let j = 0; j < canvas.width; j++)
      {
        const index = (i * canvas.width + j) * 4; //i * canvas.width gives what row, adding j gives the column, multiply times 4 since each individual pixel takes up 4 entries in the pixels array
        const r = pixels[index]; //pixels[0] has the pixels r value, subsequent +1 and +2 values are green and blue respectively
        const g = pixels[index + 1];
        const b = pixels[index + 2];

        grid[i][j] = walkable(r, g, b); //stores either True or False to indcate whether an area is walkable
      }
    }
  return grid;
}


function path(grid, x1, y1, x2, y2) //finds path from start postion (x1, y1) to end position (x2, y2), uses A* pathfinding method
{
  const needVisit = []; //unvisited pixels
  const visited = new Set(); //visited pixels, not to visited again
  const firstNode = { x: x1, y: y1, steps: 0, remaining: 0, total: 0, prev: null}; //the starting node based on what wing the user selected, steps tracks now many steps have been taken toward the destination, remaining tracks how many estimated remaining steps there are, total tracks the combined total of steps and remaining, previous tacks origin of current step

  needVisit.push(firstNode);

  while (needVisit.length > 0) //loops as long as there are pixels that need visiting
  {
    let index = 0; //used to track the index of the best node in needVisit

    for (let i = 1; i < needVisit.length; i++) //start at 1 since index tracks zero
    {
      if (needVisit[i].total < needVisit[index].total) //if i has a more efficient route, index defaults to i
      {
        index = i;
      }
    }
    const curr = needVisit.splice(index, 1)[0]; //removes the best node for explation and stores it in curr
    visited.add(`${curr.x},${curr.y}`); //add visited pixel's x, y value to visited so the code knows its already been there

    if (curr.x === x2 && curr.y ===y2) //checks if desination has been reached, and returns path used to reach destination if so
    {
      const completePath = []; //stores path used to reach desination for returning
      let node = curr;
      while (node) //reverses path using prev to reconstruct path
      {
        completePath.unshift({ x: node.x, y: node.y }); //prepends each value to array so the path comes out as start to finish instead of finish to start
        node = node.prev; //moves to previous node in path
      }
      return completePath;
    }

    const neighbor = [{x: curr.x, y: curr.y - 1}, {x: curr.x, y: curr.y + 1}, {x: curr.x - 1, y: curr.y}, {x: curr.x + 1, y: curr.y}]; //tracks the neighbors of curr, in the order of up, down, left, and right respectively

    for (let i = 0; i < neighbor.length; i++)
    {
      if (neighbor[i].x < 0 || neighbor[i].y < 0 || neighbor[i].x >= grid[0].length || neighbor[i].y >= grid.length) //skips out of bounds
      {
        continue;
      }
  
      if (!grid[neighbor[i].y][neighbor[i].x]) //skips unwalkable
      {
        continue;
      }
  
      if (visited.has(`${neighbor[i].x},${neighbor[i].y}`)) //skips already visited
      {
        continue;
      }
  
      const steps = curr.steps + 1; //current step count plus 1
      const remaining = Math.abs(neighbor[i].x - x2) + Math.abs(neighbor[i].y - y2); //straight line to destination for esitmation of remaing distance
      const total = steps + remaining; //estimation of total remaining steps
  
      let exists = null; //used to check if a neighboring pixel is already in needVisit
  
      for (let j = 0; j < needVisit.length; j++)
      {
        if (needVisit[j].x === neighbor[i].x && needVisit[j].y === neighbor[i].y) //searches through needVisit to see if neighboring pixel is already in needVisit
        {
          exists = needVisit[j];
          break;
        }
      }
  
      if (!exists) //pixel hasn't been dsicovered yet, add to needVist
      {
        needVisit.push({ x: neighbor[i].x, y: neighbor[i].y, steps: steps, remaining: remaining, total: total, prev: curr });
      }
      else if (steps < exists.steps) //if a neighbor has a shorter path, use it and update steps and total
      {
        exists.steps = steps;
        exists.total = total;
      }
    }
  }
  return null;
}


function drawPath(canvas, path) //draws path on the canvas
{
  const arrow = canvas.getContext('2d'); //allows program to draw on the canvas

  arrow.strokeStyle = 'green';
  arrow.lineWidth = 2;
  arrow.beginPath();
  arrow.moveTo(path[0].x, path[0].y); //moves to starting position

  for (let i = 1; i < path.length; i++) //goes through path and connects all of its dots to create the arrow
  {
    arrow.lineTo(path[i].x, path[i].y);
  }
  arrow.stroke(); //draws the arrow based on the lineTo commands from the for loop
}
