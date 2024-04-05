<?php
//https://www.convertcsv.com/csv-to-json.htm here upload csv  and csv to coloumn array last menu select
// Given input data
$data = [
    "KEY" => ["KETU","SHUKRA","RAVI","CHANDRA","MANGAL","RAHU","GURU","SHANI","BUDH"],
    "MESHPL" => [29,0,60,22,11,69,20,30,13],
    "MESHMN" => [-59,-91,-30,-9,-43,-35,-33,-41,-42],
    "WRUSHABHPL" => [14,0,7,3,8,30,9,13,16],
    "WRUSHABHMN" => [-21,-29,-42,0,-18,-6,-45,-4,-31],
    "MITHUNPL" => [10,30,6,14,8,9,5,15,5],
    "MITHUNMN" => [-8,-4,-11,-3,-18,0,0,-5,-6],
    "KARKPL" => [19,9,26,3,5,20,17,6,8],
    "KARKMN" => [-9,-14,-7,-13,-2,-3,-3,-4,-46],
    "SINHAPL" => [15,5,8,13,24,19,23,8,7],
    "SINHAMN" => [-33,-6,-27,-18,-15,-5,-11,-17,-9],
    "KANYAPL" => [16,25,10,15,12,50,2,68,47],
    "KANYAMN" => [-17,-20,-10,-18,-17,-9,-7,-23,-16],
    "TULAPL" => [33,18,5,31,27,21,28,28,27],
    "TULAMN" => [-9,-16,-28,-8,-11,-43,-13,-5,-9],
    "WRUSHCHIKPL" => [5,10,21,34,5,19,9,8,9],
    "WRUSHCHIKMN" => [-52,-21,-12,-10,-5,-20,-37,-5,-36],
    "DHANUPL" => [15,0,14,16,25,42,37,10,2],
    "DHANUMN" => [-14,-14,-23,-9,-11,-35,-27,-53,-6],
    "MAKARPL" => [6,17,14,16,30,5,10,4,43],
    "MAKARMN" => [-37,-18,-24,-28,-15,-38,-12,-19,-30],
    "KUNBHAPL" => [6,15,3,70,13,25,13,8,18],
    "KUNBHAMN" => [-8,-46,-50,-16,-14,-5,-35,-7,-17],
    "MEENPL" => [42,42,6,19,17,7,75,22,5],
    "MEENMN" => [-33,-14,-30,-22,-14,-31,-7,-42,-7]
];

// Initialize an empty array to store the transformed data
$transformedData = [];

// Loop through each entry in the data array
foreach ($data as $key => $values) {
    // Skip processing the "KEY" entry
    if ($key === "KEY") continue;

    // Initialize an empty associative array for each entry
    $entry = [];

    // Loop through the keys array and assign each value to its corresponding key
    for ($i = 0; $i < count($data["KEY"]); $i++) {
        $entry[$data["KEY"][$i]] = $values[$i];
    }

    // Add the entry to the transformed data array
    $transformedData[$key] = $entry;
}

// Encode the transformed data array into JSON format
$jsonOutput = json_encode($transformedData, JSON_PRETTY_PRINT);

// Output the JSON
echo $jsonOutput;

?>
