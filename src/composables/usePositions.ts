import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import type { Position } from "../interfaces/Position";
import { database } from "./../database/config";
import { child, get, ref as firebaseRef } from "firebase/database";

const dbRef = firebaseRef(database);

const getPositions = async () => {
  try {
    const snapshot = await get(child(dbRef, "/positions"));
    if (snapshot.exists()) return snapshot.val();
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const usePositions = () => {
  const positions = ref<Position[]>([]);

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["positions"],
    queryFn: () => getPositions(),
  });

  watch(
    data,
    () => {
      if (data.value) positions.value = data.value;
    },
    { immediate: true }
  );

  return {
    isLoading,
    positions,
    isError,
    error,
  };
};

export default usePositions;
