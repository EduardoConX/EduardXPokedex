import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { Position } from "../interfaces/Position";
import { database } from "./../database/config";
import { child, get, ref as firebaseRef } from "firebase/database";

const dbRef = firebaseRef(database);

const getPositions = async () => {
  let data = [];
  try {
    const snapshot = await get(child(dbRef, "/positions"));
    if (snapshot.exists()) {
      data = snapshot.val();
    }
    return snapshot.val();
  } catch (error) {
    console.error(error);
  }

  return data;
};

const usePositions = () => {
  const positions = ref<Position[]>([]);

  const { isLoading, data } = useQuery(["positions"], () => getPositions());

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
  };
};

export default usePositions;
