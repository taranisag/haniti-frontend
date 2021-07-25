import { useCallback, useEffect, useState } from "react";
import firebase from "../services/firebase";
import { api } from "../services/api";

export default () => {
  const [user, setUser] = useState<any>();
  const login = useCallback(() => {
    const fb = firebase();
    const provider = new fb.auth.GoogleAuthProvider();

    fb.auth()
      .signInWithPopup(provider)
      .then((result: any) => {
        api.setToken(result.credential.accessToken);
        setUser({ displayName: result.user.displayName, uid: result.user.uid });
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const fb = firebase();

    // fb.auth().signOut();

    const fn = async () => {
      const user = await fb.auth().currentUser;

      if (user) {
        const token = await user.getIdToken();

        api.setToken(token);

        setUser({ displayName: user.displayName, uid: user.uid });
      }
    };

    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          api.setToken(token);

          setUser({ displayName: user.displayName, uid: user.uid });
        });
      }
    });
    fn();
  }, []);

  return [user, login];
};
