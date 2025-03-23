import { useState, useEffect } from 'react';
import apiClient from '../../../services/api/apiClient'; // adjust the import path as needed
import './SocialConfigs.css';

const SocialConfigs = () => {
  const [formData, setFormData] = useState({
    beholdUrl: '',
    calendlyUrl: '',
    ytApiKey: '',
    ytChannelId: '',
    youtubePlaylistId: '', // hidden field if needed
  });

  // Fetch current social configs when component mounts.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient('/admin/social-config', 'GET', null, true);
        // Map API response to formData state.
        setFormData({
          beholdUrl: data.data?.beholdUrl || '',
          calendlyUrl: data.data?.calendlyUrl || '',
          ytApiKey: data.data?.youtubeApiKey || '',
          ytChannelId: data.data?.youtubeChannelId || '',
          youtubePlaylistId: data.data?.youtubePlaylistId || '',
        });
      } catch (error) {
        console.error('Failed to fetch social configs:', error);
        // Optionally, display an error message to the user.
      }
    };

    fetchData();
  }, []);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      beholdUrl: formData.beholdUrl,
      calendlyUrl: formData.calendlyUrl,
      youtubeApiKey: formData.ytApiKey,
      youtubeChannelId: formData.ytChannelId,
      youtubePlaylistId: formData.youtubePlaylistId,
    };

    try {
      // The fourth parameter `true` indicates that this is an admin endpoint.
      const result = await apiClient(
        '/admin/social-config',
        'POST',
        payload,
        true
      );
      console.log('Success:', result);
      // Optionally, handle success (e.g., display a success message)
    } catch (error) {
      console.error('Error:', error);
      // Optionally, handle the error (e.g., display an error message)
    }
  };

  return (
    <section className="socials">
      <div className="socials-content">
        <form onSubmit={handleSubmit}>
          <div className="socials-item">
            <h2 className="socials-title">Instagram</h2>
            <div className="socials-field">
              <label htmlFor="beholdUrl">Behold URL</label>
              <input
                type="text"
                name="beholdUrl"
                id="beholdUrl"
                value={formData.beholdUrl}
                onChange={handleChange}
              />
            </div>
            <div className="socials-field">
              <a
                href="https://behold.so/"
                target="_blank"
                rel="noopener noreferrer"
                className="behold-link"
              >
                Visit Behold
              </a>
            </div>
          </div>
          <div className="socials-item">
            <h2 className="socials-title">Calendly</h2>
            <div className="socials-field">
              <label htmlFor="calendlyUrl">Calendly URL</label>
              <input
                type="text"
                name="calendlyUrl"
                id="calendlyUrl"
                value={formData.calendlyUrl}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="socials-item">
            <h2 className="socials-title">Youtube</h2>
            <div className="socials-field">
              <label htmlFor="ytApiKey">Youtube API Key</label>
              <input
                type="text"
                name="ytApiKey"
                id="ytApiKey"
                value={formData.ytApiKey}
                onChange={handleChange}
              />
            </div>
            <div className="socials-field">
              <label htmlFor="ytChannelId">Youtube Channel Id</label>
              <input
                type="text"
                name="ytChannelId"
                id="ytChannelId"
                value={formData.ytChannelId}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Hidden input for youtubePlaylistId */}
          <input
            type="hidden"
            name="youtubePlaylistId"
            value={formData.youtubePlaylistId}
            onChange={handleChange}
          />
          <button type="submit" className="socials-btn">
            Save Social Configs
          </button>
        </form>
      </div>
    </section>
  );
};

export default SocialConfigs;
