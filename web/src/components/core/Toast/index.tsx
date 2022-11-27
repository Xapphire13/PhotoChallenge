import React, { useEffect } from "react";
import Card from "../Card";
import CardContent from "../Card/CardContent";
import ElevatedCardContainer from "../Card/ElevatedCardContainer";

const SECOND_MS = 1000;

export interface ToastProps {
  id: string;
  title: string;
  duration?: number;
  onExpire: (toastId: string) => void;
}

export default function Toast({ title, duration, id, onExpire }: ToastProps) {
  useEffect(() => {
    let timeout = 0;

    if (duration) {
      timeout = window.setTimeout(() => {
        onExpire(id);
      }, duration * SECOND_MS);
    }

    return () => window.clearTimeout(timeout);
  }, [duration, id, onExpire]);

  return (
    <ElevatedCardContainer>
      <Card>
        <CardContent>{title}</CardContent>
      </Card>
    </ElevatedCardContainer>
  );
}
