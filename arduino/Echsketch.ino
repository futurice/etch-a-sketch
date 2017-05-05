
#include "knob.h";

Knob* verticalKnob;
Knob* horizontalKnob;
int verticalValue = 0;
int horizontalValue = 0;

void setup() {
  verticalKnob = new VerticalKnob();
  verticalKnob -> initState();  
  horizontalKnob = new HorizontalKnob();
  horizontalKnob -> initState();

  Serial.begin (9600);
  // LED
  pinMode(D7, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  verticalValue = verticalKnob -> update();
  if (verticalValue != 0) {
    if (verticalValue == 1) {
      Serial.println("INCR_VERTICAL");   
    } else if (verticalValue == -1) {
      Serial.println("DECR_VERTICAL"); 
    }
  }
  horizontalValue = horizontalKnob -> update();
  if (horizontalValue != 0) {
    if (horizontalValue == 1) {
      Serial.println("INCR_HORIZONTAL");   
    } else if (horizontalValue == -1) {
      Serial.println("DECR_HORIZONTAL"); 
    }
  }
}




