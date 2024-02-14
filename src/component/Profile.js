import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "./Card";

export default function Profile() {
  const history = useHistory();
  const repoData = useSelector((state) => state.repo);
  const userData = useSelector((state) => state.user);

  return userData && <Card user={userData} />;
}
