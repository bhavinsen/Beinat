import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

export default function App() {
  const today = new Date();
  const today12 = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    12,
    0,
    0
  ).getTime();
  const bookings = [
    {
      start_time: "2021-04-01T06:30:00.000Z",
      end_time: "2021-04-01T07:15:00.000Z",
      table: "T1"
    },
    {
      start_time: "2021-04-01T07:30:00.000Z",
      end_time: "2021-04-01T08:45:00.000Z",
      table: "T1"
    },
    {
      start_time: "2021-04-01T10:45:00.000Z",
      end_time: "2021-04-01T11:30:00.000Z",
      table: "T1"
    },
    {
      start_time: "2021-04-01T07:20:00.000Z",
      end_time: "2021-04-01T07:40:00.000Z",
      table: "T2"
    },
    {
      start_time: "2021-04-01T07:10:00.000Z",
      end_time: "2021-04-01T08:10:00.000Z",
      table: "T2"
    },
    {
      start_time: "2021-04-01T07:10:00.000Z",
      end_time: "2021-04-01T08:10:00.000Z",
      table: "T3"
    },
    {
      start_time: "2021-04-01T06:30:00.000Z",
      end_time: "2021-04-01T07:15:00.000Z",
      table: "T7"
    },
    {
      start_time: "2021-04-01T07:30:00.000Z",
      end_time: "2021-04-01T08:45:00.000Z",
      table: "T5"
    },
  ];

  const tables = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"];
  const timetable = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const count = timetable.length;
  const inViewidualWidth = `${100 / count}%`;
  let lastOccupiedTime = {}; //

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const getTimeline = (booking, table) => {
    let result = [];
    let requiredWidth = 0;
    if (new Date(booking.start_time).getTime() !== lastOccupiedTime[table]) {
      requiredWidth = calculateTimeMinuteDiff(
        lastOccupiedTime[table],
        new Date(booking.start_time).getTime()
      );
      result.push(
        <View
          style={{
            width: `${requiredWidth}%`,
            backgroundColor: "transparent",
          }}
        >
        </View>
      ); //no booking
    }
    requiredWidth = calculateTimeMinuteDiff(
      new Date(booking.start_time).getTime(),
      new Date(booking.end_time).getTime()
    );
    result.push(
      <View
        style={{
          width: `${requiredWidth}%`,
          marginTop: 10,
          marginBottom: 3,
          height: 45,
          backgroundColor: getRandomColor(), borderRadius: 15,
        }}
      >
      </View>
    ); //booking
    lastOccupiedTime[table] = new Date(booking.end_time).getTime(); //set last timestamp
    return result;
  };
  const calculateTimeMinuteDiff = (time1, time2) => {
    const totalHoursMinute = count * 60; //360
    const totalBookedMinute = diff(time1, time2);
    const requiredWidth = (totalBookedMinute * 116) / totalHoursMinute;
    return requiredWidth;
  };
  function diff(start, end) {
    const diff = start - end;
    const minutes = Math.floor(diff / 1000 / 60);
    console.log(minutes, start, end, diff);
    return Math.abs(minutes);
  }
  return (
    <View style={styles.mainContain}>
      <View style={styles.containView}>
        <View style={styles.tableContan}>
          {tables.map((table) => {
            return (
              <Text style={styles.table}>{table} </Text>
            );
          })}
        </View>
        <View style={{}}>
          <ScrollView horizontal>
            <View style={styles.App}>
              <View style={styles.time}>
                <View style={styles.timeContainer}>
                  {timetable.map(
                    (v, i) =>
                      count !== i && <Text style={{ color: "#FFFFFF", fontWeight: "bold", width: timetable.length - 1 == i ? 50 : inViewidualWidth }}>{v}</Text>
                  )}
                </View>
              </View>
              <View style={{}}>
                {tables.map((table) => {
                  lastOccupiedTime = { [table]: today12 }; //
                  return (
                    <View style={styles.timeContainer1}>
                      {bookings.map((booking) => {
                        if (booking.table === table) {
                          return getTimeline(booking, table);
                        }
                      })}
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={styles.mainBorderContain}>
              {[...Array(5 * 5)].map((data, index) => {
                return (<View style={{ position: '' }}>
                  <View style={{ borderLeftWidth: index % 4 == 0 ? 2 : 1, width: 143 / 4, height: 500, borderColor: "#42444f", marginTop: 20, }}>
                  </View>
                </View>);
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContain:{
    backgroundColor: "#20212c",
  },
  containView:{
    marginTop: "20%", 
    flexDirection: "row",
  },
  tableContan:{
    width: "10%", 
    marginTop: "10%", 
    height: 200
  },
  App: {
    textAlign: "center",
  },
  table: {
    fontSize: 14,
    textAlign: "center",
    height: 50, color: "#FFFFFF",
    fontWeight: "bold"
  },
  time: {
    width: "90%",
  },
  mainBorderContain:{
    position: "absolute", 
    flexDirection: "row", 
    marginLeft: 15, 
    zIndex: -999
  },
  timeContainer: {
    flexDirection: 'row',
    width: 1000,
  },
  timeContainer1: {
    flexDirection: 'row',
    width: '86%',
    height: 50,
    marginLeft: 15
  },
  bookingConatiner: {
    width: "100%",
    flexDirection: "row",
  },
});