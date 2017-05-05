enum KnobType { HORIZONTAL, VERTICAL };

class Knob {
  protected:
    int  stateA;
    int  lastState;
    KnobType type;
    virtual void setStateA() = 0;
    virtual int readStateB() = 0;
    boolean isTurning() {
      return stateA != lastState;
    }
    boolean isTurningClockwise() {
      return readStateB() == stateA;
    };
  public:
    Knob(KnobType knobType) {
      stateA = 0;
      lastState = 0;
      type = knobType;
   }
   void initState() {
      setStateA();
   }
   int update() {
      int shouldUpdate = 0;
      setStateA();
      if (isTurning()) {
        if (isTurningClockwise()) {
          shouldUpdate = 1;
        } else {
          shouldUpdate = -1;
        }
      }
      lastState = stateA;
      return shouldUpdate;
    }
};

// D0 & D1
class VerticalKnob : public Knob {
  protected:
    virtual void setStateA() {
      stateA = digitalRead(D0);
    }
    virtual int readStateB() {
      return digitalRead(D1);
    }
  public:
    VerticalKnob(): Knob(KnobType::VERTICAL)
    {
      pinMode(D0, INPUT);
      pinMode(D1, INPUT);
    }
};

// D2 & D3
class HorizontalKnob : public Knob {
  protected:
    virtual void setStateA() {
      stateA = digitalRead(D2);
    }
    virtual int readStateB() {
      return digitalRead(D3);
    }
  public:
    HorizontalKnob(): Knob(KnobType::HORIZONTAL)
    {
      pinMode(D2, INPUT);
      pinMode(D3, INPUT);
    }
};


